const shared = require('./shared_routines.js');
const sharedInVOut = require('./candidate_calculation_in_vs_out_shared.js');


/**
 * This reads zip code and district data from a local csv file. This returns 
 *  an array of objects that each contain a zip code and with districts 1 to 9.
 *  Each district uses a 1.0 to indicate if the district contains the zip code and
 *  a 0.0 if it does not. Zip codes can be within multiple districts.
 * @returns {object[]} - 
 *    [ { 'zipcode': '12345', 'district 1': '1.0', 'district 2': '0.0', ..., 'district 9': '1.0' }, ... ]
 */
function getZipCodesWithinDistricts() {
  const zipCodesFileName = 'sd_district_zipcodes.csv';

  const fileData = shared.getAssetsDataFromLocalFile( zipCodesFileName ); 
  return shared.parseCSVDataToObjects( fileData );
}
  
/**
 * This takes an array of zip codes with districts and returns an array of 
 *  districts that contain an array of zip codes within them.
 * @param {object[]} zipCodesWithinDistrict - 
 *    [ { 'zipcode': '12345', 'district 1': '1.0', ..., 'district 9': '1.0' }, ... ]
 * @returns {object[]} - 
 *    [ { districtName: "district 1", zipCodes: [ '12345', '23456', ... ] }, { }, ... ]
 */
function getDistrictsWithZipCodes(zipCodesWithinDistrict) {
  // This is the header row of the cvs file excluding the first column header ('zipcode')
  //  Keys: 'zipcode','district 1', ... ,'district 9'
  //  Result: 'district 1', ... ,'district 9'
  const districtNames = (Object.keys(zipCodesWithinDistrict[0])).slice(1);

  const districtZipCodes = districtNames
    .map( district => {
      const zipCodes = zipCodesWithinDistrict
        .filter( zipData => zipData[district] === '1.0' )
        .map( zipData => zipData['zipcode'] )

      return { districtName: district, zipCodes }
    })

  return districtZipCodes;
}


/**
 * Compares the transactions to find those for a candidate where the zip code matches one from a given list.
 *  Then split the lists and return the sum of a key from each list.
 * @param {object} candidate - The fields associated with a candidate originating from a Google Sheet  
 * @param {object[]} transactions - Multiple years of NetFile transactions loaded from a CSV file
 * @param {string} zipCodeKey - Field within each transaction compare to  
 * @param {string[]} zipCodeList - List of zip code to compare zipCodeKey to
 * @returns {object[]} - { in: '1234', out: '4321' }
 */
function getInVsOutSums(candidate, transactions, zipCodeKey, zipCodeList) {
  const transactionAmountKey = 'Tran_Amt1';
  const formTypeKey = 'Form_Type';
  const formTypes = [ 'A', 'C', 'I' ];

  // Find all transactions associated with a candidate's committee
  let transactionsFound = transactions
    .filter( transaction => transaction['FilerName'].toLowerCase() === candidate['Committee Name (Filer_Name)'].toLowerCase() ); // #5, #7

  // Filter the transactions to those where the field formTypeKey is one of the values in field formTypes
  transactionsFound = shared.filterListOnKeyByArray( transactionsFound, formTypeKey, formTypes ); // #5, #7
  
  // Split the filtered transactions into two lists. One list are those transactions where the field zipCodeKey
  // contains a values in zipCodeList and the other list are those that do not contain a value in zipCodeList. 
  const transactionsIn = shared.filterListOnKeyByArray( transactionsFound, zipCodeKey, zipCodeList);
  const transactionsOut = shared.filterListOnKeyByNotInArray( transactionsFound, zipCodeKey, zipCodeList);

  return { // Get the sum of each of the two lists and convert each to a string with no decimal places
    in: shared.sumKeyInList( transactionsIn, transactionAmountKey ).toFixed(0),
    out: shared.sumKeyInList( transactionsOut, transactionAmountKey ).toFixed(0),
  }
}


// Main entry function of script
(async () => {
  const officesPerDistrict = [ 'City Council' ];
  const officeKey = 'Office';
  const zipCodesWithinDistrict = getZipCodesWithinDistricts();
  const districtsWithZipCodes = getDistrictsWithZipCodes(zipCodesWithinDistrict);

  // From the local CSV files
  const transactions = shared.getTransactions(); // #5 

  // From an online Google Sheet 
  const candidates = await shared.getCandidateInformation(); // #1 

  let candidatesWithDistricts = shared.filterListOnKeyByArray( candidates, officeKey, officesPerDistrict )

  candidatesWithDistricts = candidatesWithDistricts//.slice(0, 2)
    .map( candidate => {
      // get the zip codes for each candidate's district
      const zipCodeList = districtsWithZipCodes
        .find( district => district.districtName.toLowerCase() === `district ${candidate['District']}`.toLowerCase() );

      // add a field to each candidate to store the in and out sums, Example { in: '1234', out: '4321' }
      candidate[sharedInVOut.sumsField] = getInVsOutSums( candidate, transactions, sharedInVOut.zipCodeKey, zipCodeList['zipCodes'] );

      return candidate;
    });

  shared.saveCandidatesDataToFiles( candidatesWithDistricts, sharedInVOut.sumsField, sharedInVOut.writeToInOutCallback );

})();
