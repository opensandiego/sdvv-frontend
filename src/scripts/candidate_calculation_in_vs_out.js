const shared = require('./shared_routines.js');


 /**
  * This checks to see if a 'key' exists in the 'jsonData' and
  *  if not then assign it a value to match that from a given json file.
  * @param {object} object - this is a structured json file data
  * @param {string} key 
  * @returns {object}
  */
function createPropertyIfNotExist(jsonData, key) {
  if ( !jsonData.hasOwnProperty(key) ) {
    jsonData[key] = [ { } ];
  }

  return jsonData;
}

/**
 * This updates the given 'jsonData' to add a value to specific property.
 *  This is needed to match the format of the data stored in the json file.
 * @param {string} value 
 * @param {object} jsonData
 * @returns {object}
 */
function writeToInOutCallback( value, jsonData ) {
  const key = "in vs out district";
  jsonData = createPropertyIfNotExist(jsonData, key);

  jsonData[key][0] = value;

  return jsonData;
}

/**
 * This returns an array of string that contain the zip codes from a csv file.
 * @returns {string[]} 
 */
function getZipCodes(){
  const zipCodesFileName = 'sd_zipcodes.csv';

  const csvZipCodes = shared.getAssetsDataFromLocalFile( zipCodesFileName ); 
  const zipCodesData = shared.parseCSVDataToObjects( csvZipCodes );

  return zipCodesData.map( element => element.zip_code );
}


/**
 * For each candidate that is running for the given office this sums the 'transactionAmountKey' 
 *  field for each of the transactionsGroups where the 'formTypeKey' field is one of the 'formTypes'
 * For every group in transactionsGroups this returns a key value pair where the key is from a 
 *  group's type property and the key is the calculated sum.
 * @param {string} office - Title of the office that candidates are running for
 * @param {string[]} candidates - List of candidates with their related data fields
 * @param {object[][]} transactionsGroups - Each group is an array of NetFile transaction data from the CSV files
 * @returns {object[]} 
 */
function calculateCandidateGroupSum( office, candidates, sumKeyField, transactionsGroups ) {

  const transactionAmountKey = 'Tran_Amt1';
  const formTypeKey = 'Form_Type';
  const formTypes = [ 'A', 'C', 'I' ];

  return candidates
  .filter( candidate => candidate.Office.toLocaleLowerCase() === office.toLocaleLowerCase() ) // #2
  .map( candidate => { // #3

    const entries = transactionsGroups.map( group => { 

      let transactionsFound = group.transactions
        .filter( transaction => transaction['FilerName'] === candidate['Committee Name (Filer_Name)'] ); // #5, #7
      
      transactionsFound = shared.filterListOnKeyByArray( transactionsFound, formTypeKey, formTypes ); // #5, #7

      return  [ 
        group.type, 
        shared.sumKeyInList( transactionsFound, transactionAmountKey ).toFixed(0) // #5
      ];
    });

    // Convert the entries array [ "group type a": "0", "group type b": "0" ]
    //  into an object { "group type a": "0", "group type b": "0" }
    candidate[sumKeyField] = Object.fromEntries(entries);

    return candidate;
  });
}

// Main entry function of script
(async () => {

  const zipCodeKey = 'Tran_Zip4';
  const offices = [ 'Mayor', 'City Council', 'City Attorney' ];
  const sumsField = 'inAndOut';

  // The valid zip code list as an array of strings from a local CSV file
  const zipCodes = getZipCodes(); // #4
  
  // From the local CSV files
  const transactions = shared.getTransactions(); // #5 

  const transactionsGroups = [ 
    { type: 'in',  transactions: shared.filterListOnKeyByArray( transactions, zipCodeKey, zipCodes) }, 
    { type: 'out', transactions: shared.filterListOnKeyByNotInArray( transactions, zipCodeKey, zipCodes) }, 
  ];

  // From an online Google Sheet 
  const candidates = await shared.getCandidateInformation(); // #1 

  offices
  .map( office => calculateCandidateGroupSum( office, candidates, sumsField, transactionsGroups ) )
  .map( candidatesWithSums => shared.saveCandidatesDataToFiles( candidatesWithSums, sumsField, writeToInOutCallback ) );
 
})();
