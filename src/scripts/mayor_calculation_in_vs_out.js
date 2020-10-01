const { toFixed } = require('core-js/fn/number/epsilon');
const shared = require('./shared_routines.js');


function createPropertyIfNotExist(object) {
  if ( !object.hasOwnProperty("in vs out district") ) {
    object["in vs out district"] = [ { } ];
    console.log('Created', object) // for testing
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

(async () => {

  const candidateInformation = await shared.getCandidateInformation(); // #1
  const mayors = candidateInformation.filter(candidate => { // #2
    return candidate.Office.toLocaleLowerCase() === 'mayor';
  });

  // #4, valid zip code list as an array of strings
  const zipCodes = getZipCodes();
    
  let transactions = shared.getTransactions();
  
  
  const transactionsWithinZipCodes = shared.filterListOnKeyByArray( transactions, 'Tran_Zip4', zipCodes);
  const transactionsNotWithinZipCodes = shared.filterListOnKeyByNotInArray( transactions, 'Tran_Zip4', zipCodes);

  let mayorsWithSums = mayors.map( mayor => {
    mayor.inDistrict = '0';
    mayor.outOfDistrict = '0';

    const transactionsInDistrict = 
      transactionsWithinZipCodes.filter( transaction => transaction['FilerName'] === mayor['Committee Name (Filer_Name)'] );
      
    const transactionsNotInDistrict = 
      transactionsNotWithinZipCodes.filter( transaction => transaction['FilerName'] === mayor['Committee Name (Filer_Name)'] );

          
    const transactionsInDistrictACI = shared.filterListOnKeyByArray( transactionsInDistrict, 'Form_Type', [ 'A', 'C', 'I' ] );
    const transactionsNotInDistrictACI = shared.filterListOnKeyByArray( transactionsNotInDistrict, 'Form_Type', [ 'A', 'C', 'I' ] );
      
    mayor.inDistrict = shared.sumKeyInList( transactionsInDistrictACI, 'Tran_Amt1' ).toFixed(0);
    mayor.outOfDistrict = shared.sumKeyInList( transactionsNotInDistrictACI, 'Tran_Amt1' ).toFixed(0);

    return mayor;
  });
  
  mayorsWithSums.map( mayor => {
    let path = shared.getCandidateRelativeFilePath(mayor);

    shared.updateJSONFileWithValue( path, mayor.inDistrict, writeToIn ); // #6
    shared.updateJSONFileWithValue( path, mayor.outOfDistrict, writeToOut ); // #8    

  });

})();
