const fs = require('fs');
const fetch = require('node-fetch');
const pRetry = require('p-retry');
const parse = require('csv-parse');
const parseSync = require('csv-parse/lib/sync');

const ASSETS_PATH = `${__dirname}/../assets`;
const DATA_PATH = `${ASSETS_PATH}/data`;
// const CANDIDATE_PATH = `${ASSETS_PATH}/candidates`;
const NETFILE_API_CSV_FILENAMES = ['netfile_api_2018.csv', 'netfile_api_2019.csv', 'netfile_api_2020.csv'];

/**
 * Fetches data from a url with retries with exponential back off.
 * @param {string} url 
 * @returns {string} 
 */
async function doGetRequest(url) {

  const doFetch = async (attempt) => {
    if ( attempt > 1 ) {
      console.log(` > fetch retry attempt: ${attempt}`);
    }
      
    const fetchResponse = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })

    // Abort retrying if the resource doesn't exist
    if (fetchResponse.status === 404) {
      throw new pRetry.AbortError(fetchResponse.statusText);
    }

    return (await fetchResponse.text());

  }

  return await pRetry( doFetch, {retries: 10} );
}

/**
 * Fetches data from a url
 * @param {string} url 
 * @returns {object[]} 
 */
async function getDataFromURL( url ) {
  let response, fileData;

  response = await fetch(url);

  if ( !response.ok ) {
    throw `Error fetching\n url: ${url}\n Status: ${response.status} \n Response: ${response.statusText}`;
  }

  fileData = await response.text();

  return fileData;
}

/**
 * Reads Candidate data from a Google Sheet.
 * @returns {object[]} - candidate information objects
 */
async function getCandidateInformation() {
  const CANDIDATE_INFORMATION_URL = 
    "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0";

  const data = await getDataFromURL( CANDIDATE_INFORMATION_URL );
  return parseCSVDataToObjects( data );
}

/**
 * Reads transaction data from multiple CSV files stored locally.
 * @returns {object[]} - transactions
 */
function getTransactions() {
  let transactionsSets = NETFILE_API_CSV_FILENAMES.map( fileName => {
    let data = getAssetsDataFromLocalFile( fileName );
    return parseCSVDataToObjects( data );
  });

  return transactionsSets.flat();
}

/**
 * Reads from a given local filename within a predetermined path.
 * @returns {object[]} - contents of the file
 */
function getAssetsDataFromLocalFile( filename ) {
  // const filePath = `${ASSETS_PATH}/${filename}`
  const filePath = `${ASSETS_PATH}/data/${filename}`

  if ( !fs.existsSync(filePath) ) {
    throw `File not found: ${filePath}`;
  }

  return fs.readFileSync(filePath, 'utf8' );
}

/**
 * Takes a string of CSV data and parses into an array of objects
 * @param {string} csvData 
 * @returns {object[]} - parsed objects
 */
function parseCSVDataToObjects( csvData ) {
  return records = parseSync(csvData, {
    columns: true,
    skip_lines_with_empty_values: true,
  });
}

/**
 * This filters a given list by limiting the results to list items
 *  who's key field is within the filteringArray.
 * @param {object[]} list 
 * @param {string} key 
 * @param {string[]} filteringArray 
 * @returns {object[]} - subset of the given list
 */
function filterListOnKeyByArray( list, key, filteringArray ) {
  return list.filter( item => filteringArray.includes( item[key]) );
}

/**
 * This filters a given list by limiting the results to list items
 *  who's key field is NOT within the filteringArray.
 * @param {object[]} list 
 * @param {string} key 
 * @param {string[]} filteringArray 
 * @returns {object[]} - subset of the given list
 */
function filterListOnKeyByNotInArray( list, key, filteringArray ) {
  return list.filter( item => !filteringArray.includes( item[key]) );
}

/**
 * This return the sum of the given key fields in the list
 * @param {object[]} list 
 * @param {string} key 
 * @returns {number} 
 */
function sumKeyInList( list, key ) {
  return list.reduce( (accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue[key])
  }, 0);
}

/**
 * This takes a candidate object and uses it to determine the path and file name
 *   that the corresponding json file should be located at.
 * @param {object} candidate
 * @param {boolean} useAlternateCityCouncilPath
 * @returns {string} - the combined location and json file name 
 */
function getCandidateRelativeFilePath( candidate, useAlternateCityCouncilPath = false ) {
  // Replace all spaces in candidate name and office with underscores '_'
  const candidatePathName = candidate['Candidate_Name'].split(' ').join('_').toLowerCase();
  const office = candidate['Office'].split(' ').join('_').toLowerCase();

  // The location of the City Council Candidates follows a different pattern than the other offices
  if ( candidate['Office'].toLowerCase() === 'City Council'.toLowerCase() ) {

    if ( useAlternateCityCouncilPath ) {
      // This path uses an _ between the office and district, example: city_council_district_0
      return `${candidate['Year']}/${office}_district_${candidate['District']}/${candidatePathName}/${candidatePathName}.json`;
    }

    // This path uses a / between the office and district, example: city_council/district_0
    return `${candidate['Year']}/${office}/district_${candidate['District']}/${candidatePathName}/${candidatePathName}.json`; 

  }

  return `${candidate['Year']}/${office}/${candidatePathName}/${candidatePathName}.json`;
}

/**
 * @callback writeToPropertyCallback
 * @param {string} - value to write into json data
 * @param {object} - json data to update
 * @returns {object} - modified json data
 */


/**
 * Opens a local json file located at a given fileNamePath and generates and object from it.
 *  This sets the value on the json object to a property determined by the callback function
 *  funWriteToObject. Then the modified json data is saved back to the local file system.
 * @param {string} fileNamePath
 * @param {string} value
 * @param {writeToPropertyCallback} funWriteToObject
 */
function updateJSONFileWithValue( fileNamePath, value, funWriteToObject ) {
  const CANDIDATES_PATH = '../assets/candidates';

  const filePath = `${CANDIDATES_PATH}/${fileNamePath}`;

  if ( !fs.existsSync(filePath) ) {
    console.error(`File not found: ${filePath}`)
    return;
  }

  const fileData = fs.readFileSync(filePath, 'utf8' );

  let json = JSON.parse(fileData);

  // Update the JSON file data by running the given function with the given values
  json = funWriteToObject( value, json );

  updatedFileData = JSON.stringify(json, null, 2);

  fs.writeFileSync(filePath, updatedFileData + '\n', 'utf8');

}

/**
 * This calls a function to update the 'keyFieldToSave' of each of the 
 *  'candidates' json data and saves the files.
 * @param {object[]} candidates 
 * @param {string} keyFieldToSave 
 * @param {callback} callbackFn 
 */
function saveCandidatesDataToFiles( candidates, keyFieldToSave, callbackFn ) {

  candidates.map( candidate => {

    // #6, #8
    updateJSONFileWithValue( 
      getCandidateRelativeFilePath(candidate), 
      candidate[keyFieldToSave], 
      callbackFn 
    );

    // Also update the JSON data in the old city council folder path
    updateJSONFileWithValue( 
      getCandidateRelativeFilePath(candidate, true), 
      candidate[keyFieldToSave], 
      callbackFn
    );

  });

}


module.exports = {
  getCandidateInformation,
  getDataFromURL,
  getAssetsDataFromLocalFile,
  parseCSVDataToObjects,
  getTransactions,
  filterListOnKeyByArray,
  getCandidateRelativeFilePath,
  sumKeyInList,
  updateJSONFileWithValue,
  filterListOnKeyByNotInArray,
  saveCandidatesDataToFiles,
  doGetRequest,
  ASSETS_PATH, DATA_PATH,
};
