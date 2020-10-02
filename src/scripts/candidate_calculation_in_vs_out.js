const { toFixed } = require('core-js/fn/number/epsilon');
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

  const csvZipCodes = shared.getDataFromLocalFile( zipCodesFileName ); 
  const zipCodesData = shared.parseCSVDataToObjects( csvZipCodes );
  return zipCodesData.map( element => element.zip_code );
}

async function calculateCandidateInVOut( office, zipCodes, transactions ) {
  const zipCodeKey = 'Tran_Zip4';
  const transactionAmountKey = 'Tran_Amt1';
  const formTypeKey = 'Form_Type';
  const formTypes = [ 'A', 'C', 'I' ];

  const candidateInformation = await shared.getCandidateInformation(); // #1
  const candidates = candidateInformation.filter(candidate => { // #2
    return candidate.Office.toLocaleLowerCase() === office.toLocaleLowerCase();
  });

  const transactionsWithinZipCodes = shared.filterListOnKeyByArray( transactions, zipCodeKey, zipCodes);
  const transactionsNotWithinZipCodes = shared.filterListOnKeyByNotInArray( transactions, zipCodeKey, zipCodes);

  let candidateWithSums = candidates.map( candidate => { // #3
    candidate.inDistrict = '0';
    candidate.outOfDistrict = '0';

    const transactionsInDistrict = 
      transactionsWithinZipCodes.filter( transaction => transaction['FilerName'] === candidate['Committee Name (Filer_Name)'] ); // #5
      
    const transactionsNotInDistrict = 
      transactionsNotWithinZipCodes.filter( transaction => transaction['FilerName'] === candidate['Committee Name (Filer_Name)'] ); // #7

    const transactionsInDistrictACI = shared.filterListOnKeyByArray( transactionsInDistrict, formTypeKey, formTypes ); // #5
    const transactionsNotInDistrictACI = shared.filterListOnKeyByArray( transactionsNotInDistrict, formTypeKey, formTypes ); // #7
      
    candidate.inDistrict = shared.sumKeyInList( transactionsInDistrictACI, transactionAmountKey ).toFixed(0);
    candidate.outOfDistrict = shared.sumKeyInList( transactionsNotInDistrictACI, transactionAmountKey ).toFixed(0);

    return candidate;
  });

  candidateWithSums.map( candidate => {
    let path = shared.getCandidateRelativeFilePath(candidate);

    shared.updateJSONFileWithValue( path, candidate.inDistrict, writeToIn ); // #6
    shared.updateJSONFileWithValue( path, candidate.outOfDistrict, writeToOut ); // #8
  });

}

// Main entry function of script
(async () => {

  let offices = [ 'mayor', 'City Council', 'City Attorney' ];

  // #4, valid zip code list as an array of strings
  const zipCodes = getZipCodes();
  
  let transactions = shared.getTransactions(); // #5

  Promise.all(
    offices.map( office => calculateCandidateInVOut( office, zipCodes, transactions ) )
  ).then();

})();
