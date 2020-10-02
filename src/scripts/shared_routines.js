const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('csv-parse');
const parseSync = require('csv-parse/lib/sync');

const ASSETS_PATH = '../assets/data';
const NETFILE_API_CSV_FILENAMES = ['netfile_api_2018.csv', 'netfile_api_2019.csv', 'netfile_api_2020.csv'];


/**
 * Reads from a Google Sheet and returns an array of candidate information objects.
 */
async function getCandidateInformation() {
  const CANDIDATE_INFORMATION_URL = 
    "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0";

  const data = await getDataFromURL( CANDIDATE_INFORMATION_URL );
  return parseCSVDataToObjects( data );
}

function getTransactions() {
  let transactionsSets = NETFILE_API_CSV_FILENAMES.map( fileName => {
    let data = getAssetsDataFromLocalFile( fileName );
    return parseCSVDataToObjects( data );
  });

  return transactionsSets.flat();
}

async function getDataFromURL( url ) {
  let response, fileData;

  try {
    response = await fetch(url);
    fileData = await response.text();
  } catch (error) {
    console.error(error);
  }

  return fileData;
}

function getAssetsDataFromLocalFile( filename ) {
  const filePath = `${ASSETS_PATH}/${filename}`

  return fs.readFileSync(filePath, 'utf8' );
}

function parseCSVDataToObjects( csvData ) {
  return records = parseSync(csvData, {
    columns: true,
    skip_lines_with_empty_values: true,
  });
}

function filterListOnKeyByArray( list, key, filteringArray ) {
  return list.filter( item => filteringArray.includes( item[key]) );
}

function filterListOnKeyByNotInArray( list, key, filteringArray ) {
  return list.filter( item => !filteringArray.includes( item[key]) );
}

function sumKeyInList( list, key ) {
  return list.reduce( (accumulator, currentValue) => {
    return accumulator + parseFloat(currentValue[key])
  }, 0);
}

function getCandidateRelativeFilePath( candidate ) {
  // Replace all spaces in candidate name and office with underscores '_'
  const candidatePathName = candidate['Candidate_Name'].split(' ').join('_').toLowerCase();
  const office = candidate['Office'].split(' ').join('_').toLowerCase();
  
  if ( candidate['Office'].toLowerCase() === 'City Council'.toLowerCase() ) {
    // The location of the City Council Candidates follows a different pattern than the other offices
    return `${candidate['Year']}/${office}_district_${candidate['District']}/${candidatePathName}/${candidatePathName}.json`;
  }

  return `${candidate['Year']}/${office}/${candidatePathName}/${candidatePathName}.json`;;
}


function updateJSONFileWithValue( fileName, value, funWriteToObject ) {
  const CANDIDATES_PATH = '../assets/candidates';

  const filePath = `${CANDIDATES_PATH}/${fileName}`;

  if ( !fs.existsSync(filePath) ) {
    console.error(`File not found: ${filePath}`)
    return; // or error!
  }

  const fileData = fs.readFileSync(filePath, 'utf8' );

  let json = JSON.parse(fileData);

  // Update the JSON file data by running the given function with the given value
  json = funWriteToObject( value, json );

  updatedFileData = JSON.stringify(json, null, 2);

  fs.writeFileSync(filePath, updatedFileData + '\n', 'utf8');

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
};
