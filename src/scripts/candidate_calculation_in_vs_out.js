const shared = require('./shared_routines.js');


function createPropertyIfNotExist(object) {
  if ( !object.hasOwnProperty("in vs out district") ) {
    object["in vs out district"] = [ { } ];
  }
  return object;
}

// Used to write to the specific property in a given object
function writeToIn( value, object ) {
  object = createPropertyIfNotExist(object);

  object["in vs out district"][0]["in"] = value;
  return object;
}

function writeToOut( value, object ) {
  object = createPropertyIfNotExist(object);

  object["in vs out district"][0]["out"] = value;
  return object;
}


function getZipCodes(){
  const zipCodesFileName = 'sd_zipcodes.csv';

  const csvZipCodes = shared.getAssetsDataFromLocalFile( zipCodesFileName ); 
  const zipCodesData = shared.parseCSVDataToObjects( csvZipCodes );
  return zipCodesData.map( element => element.zip_code );
}

async function calculateCandidateInVOut( office, transactionsIn, transactionsOut, candidates ) {

  const transactionAmountKey = 'Tran_Amt1';
  const formTypeKey = 'Form_Type';
  const formTypes = [ 'A', 'C', 'I' ];

  candidates
  .filter( candidate => candidate.Office.toLocaleLowerCase() === office.toLocaleLowerCase() ) // #2
  .map( candidate => { // #3

    candidate.inDistrict = '0';
    candidate.outOfDistrict = '0';

    const transactionsInDistrict = 
      transactionsIn.filter( transaction => transaction['FilerName'] === candidate['Committee Name (Filer_Name)'] ); // #5
      
    const transactionsNotInDistrict = 
      transactionsOut.filter( transaction => transaction['FilerName'] === candidate['Committee Name (Filer_Name)'] ); // #7

    const transactionsInDistrictACI = shared.filterListOnKeyByArray( transactionsInDistrict, formTypeKey, formTypes ); // #5
    const transactionsNotInDistrictACI = shared.filterListOnKeyByArray( transactionsNotInDistrict, formTypeKey, formTypes ); // #7
      
    candidate.inDistrict = shared.sumKeyInList( transactionsInDistrictACI, transactionAmountKey ).toFixed(0);
    candidate.outOfDistrict = shared.sumKeyInList( transactionsNotInDistrictACI, transactionAmountKey ).toFixed(0);

    return candidate;

  }).map( candidate => {

    let path = shared.getCandidateRelativeFilePath(candidate);

    shared.updateJSONFileWithValue( path, candidate.inDistrict, writeToIn ); // #6
    shared.updateJSONFileWithValue( path, candidate.outOfDistrict, writeToOut ); // #8

  });

}

// Main entry function of script
(async () => {

  const zipCodeKey = 'Tran_Zip4';
  const offices = [ 'mayor', 'City Council', 'City Attorney' ];

  const candidateInformation = await shared.getCandidateInformation(); // #1

  // #4, valid zip code list as an array of strings
  const zipCodes = getZipCodes();
  
  const transactions = shared.getTransactions(); // #5

  const transactionsInZipCodes = shared.filterListOnKeyByArray( transactions, zipCodeKey, zipCodes);
  const transactionsNotInZipCodes = shared.filterListOnKeyByNotInArray( transactions, zipCodeKey, zipCodes);

  Promise.all(
    offices.map( office => calculateCandidateInVOut( 
      office, transactionsInZipCodes, transactionsNotInZipCodes, candidateInformation ) )
  ).then();

})();
