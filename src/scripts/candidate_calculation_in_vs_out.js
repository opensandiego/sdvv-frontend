const shared = require('./shared_routines.js');


function createPropertyIfNotExist(object) {
  if ( !object.hasOwnProperty("in vs out district") ) {
    object["in vs out district"] = [ { } ];
  }

  return object;
}

// Used to write to the specific property in a given object
function writeToInOut( value, object ) {
  object = createPropertyIfNotExist(object);

  object["in vs out district"][0] = value;

  return object;
}


function getZipCodes(){
  const zipCodesFileName = 'sd_zipcodes.csv';

  const csvZipCodes = shared.getAssetsDataFromLocalFile( zipCodesFileName ); 
  const zipCodesData = shared.parseCSVDataToObjects( csvZipCodes );

  return zipCodesData.map( element => element.zip_code );
}


/**
 * Reads the name of an office, candidates for the office, and list of a list of transactions. 
 * For each candidate this determines which transactions are with the candidate ....
 * @param {string} office
 * @param {string[]} candidates 
 * @param {object[][]} transactionsTypes
 * @returns { []} 
 */
function calculateCandidateInVOut( office, candidates, transactionsTypes ) {

  const transactionAmountKey = 'Tran_Amt1';
  const formTypeKey = 'Form_Type';
  const formTypes = [ 'A', 'C', 'I' ];

  return candidates
  .filter( candidate => candidate.Office.toLocaleLowerCase() === office.toLocaleLowerCase() ) // #2
  .map( candidate => { // #3

    const entries = transactionsTypes.map( transactionsType => { 

      let transactionsFound = 
        transactionsType.transactions.filter( transaction => transaction['FilerName'] === candidate['Committee Name (Filer_Name)'] ); // #5, #7
      
      transactionsFound = shared.filterListOnKeyByArray( transactionsFound, formTypeKey, formTypes ); // #5, #7

      const sum = shared.sumKeyInList( transactionsFound, transactionAmountKey ).toFixed(0);

      return  [ transactionsType.type, sum ] ;
    });

    candidate.inAndOut = Object.fromEntries(entries);
    // Example values for candidate.inAndOut = { in: "0", out: "0" }

     return candidate;
  });
}

function saveCandidatesDataToFiles( candidates ) {

  candidates.map( candidate => {

    const path = shared.getCandidateRelativeFilePath(candidate);

    shared.updateJSONFileWithValue( path, candidate.inAndOut, writeToInOut ); // #8

  });

}

// Main entry function of script
(async () => {

  const zipCodeKey = 'Tran_Zip4';
  const offices = [ 'Mayor', 'City Council', 'City Attorney' ];

  const candidates = await shared.getCandidateInformation(); // #1

  // #4, valid zip code list as an array of strings
  const zipCodes = getZipCodes();
  
  const transactions = shared.getTransactions(); // #5

  const transactionsTypes = [ 
    { type: 'in',  transactions: shared.filterListOnKeyByArray( transactions, zipCodeKey, zipCodes) }, 
    { type: 'out', transactions: shared.filterListOnKeyByNotInArray( transactions, zipCodeKey, zipCodes) }, 
  ];

  offices
  .map( office => calculateCandidateInVOut( office, candidates, transactionsTypes ) )
  .map( candidates => saveCandidatesDataToFiles(candidates) );
 
})();
