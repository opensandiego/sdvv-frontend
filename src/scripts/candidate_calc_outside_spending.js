
const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('csv-parse');
const parseSync = require('csv-parse/lib/sync');

/**
 * 
 *  @returns {Promise <string[]>}
 */
async function getCandidateNames() {
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0";
  let response, fileData;

  try {
    response = await fetch(SHEET_URL);
    fileData = await response.text();
  } catch (error) {
    console.log(error);
  }

  const records = parseSync(fileData, {
    columns: true,
    skip_lines_with_empty_values: true,
    on_record: (record) => [record['Candidate_Name']]
  }).join(',').split(',');

  return records;
}


/**
 * @typedef Transactions
 * @type {object}
 * @property {string} Tran_Amt1 - Decimal number in a string example '1234.56'
 * @property {string} Candidate_Full_Name - Name of the Candidate as 'First Last'
 * @property {string} Sup_Opp_Cd - Either 'S' or 'O'
 */


/**
 * 
 *  @returns {Promise <Transactions[]>}
 */
async function getFilteredTransactions() {
  
  const path = '../assets/data/';
  const fileNames = ['netfile_api_2019.csv', 'netfile_api_2020.csv'];

  const transactionTypes = ['F496'];

  let output = [];

  for await(const fName of fileNames) {

    const stream = fs.createReadStream( path + fName , { encoding: 'utf-8' });

    const parser = stream.pipe(
      parse({
        columns: true,
        skip_lines_with_empty_values: true,
        on_record: (record) => { 

          // check if the value in column Form_Type matches one of the values in transactionTypes
          if ( transactionTypes.includes( record['Form_Type'] ) ) {            

            const { 
              NetFileKey, FilerStateId, FilerName, // only use these 3 for testing
              Tran_Amt1, Cand_NamL, Cand_NamF, Sup_Opp_Cd } = record;

            // The Candidate names in Cand_NamL, Cand_NamF are not constant. For some the names is only in Cand_NamL for others it is split between Cand_NamL and Cand_NamF. This assignment makes them consistent.
            let Candidate_Full_Name = Cand_NamF === '' ? Cand_NamL : `${Cand_NamF} ${Cand_NamL}`;

            return { 
              NetFileKey, FilerStateId, FilerName, // only use these 3 for testing
              Tran_Amt1, Candidate_Full_Name, Sup_Opp_Cd }; 

          }
        }
      })
    );

    try {
      for await (const record of parser) {
        output.push(record);
      }
    } catch(e) {
      console.log(e);
    }

  }

  return output;
}


/**
 * @typedef {object} CandidateSpending
 * @property {string} candidateName - Name of the Candidate as 'First Last'
 * @property {number} supportSum - Decimal number for the sum of all spending in support of a candidate
 * @property {number} opposedSum - Decimal number for the sum of all spending in opposition to a candidate
 */

/**
 * 
 * @param {string[]} candidateNames - 
 * @param {Transactions[]} transactions - 
 * @returns {CandidateSpending[]}
 */
function getSpendingAmounts(candidateNames, transactions) {

  let candidateSums = candidateNames.map( candidate =>  {

    let supportSum = transactions
    .filter( (transaction) => candidate === transaction.Candidate_Full_Name)
    .filter( (transaction) =>  transaction.Sup_Opp_Cd === 'S')
    .reduce( (accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.Tran_Amt1), 0);

    let opposedSum = transactions
    .filter( (transaction) => candidate === transaction.Candidate_Full_Name)
    .filter( (transaction) =>  transaction.Sup_Opp_Cd === 'O')
    .reduce( (accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.Tran_Amt1), 0);

    return {
      candidateName: candidate,
      supportSum,
      opposedSum
    };
    
  });

  return candidateSums;
}


/**
 * 
 * @param {CandidateSpending[]} outsideSpending 
 */
function saveOutsideSpendingToJSON(outsideSpending) {
  const pathPrefix = '../assets/candidates/2020/mayor/';

  for (const candidate of outsideSpending) {

    // Replace all spaces in candidate names with underscores '_'
    const candidatePathName = candidate.candidateName.split(' ').join('_').toLowerCase();

    const filePath = pathPrefix + `${candidatePathName}/${candidatePathName}.json`;

    let updatedFileData;
    try {

      // Skip candidates who do not have a JSON file.
      if ( !fs.existsSync(filePath) ) {
        // console.log(`No data saved for ${candidate.candidateName} since '${filePath}' does not exist.`);
        continue;
      }

      const fileData = fs.readFileSync(filePath, 'utf8' );

      let json = JSON.parse(fileData);
      json['support'] = candidate.supportSum.toFixed(2);
      json['oppose'] =  candidate.opposedSum.toFixed(2);
      updatedFileData = JSON.stringify(json, null, 2);

      fs.writeFileSync(filePath, updatedFileData + '\n', 'utf8');

    } catch (error) {
      console.log(error);
    }

  }

}


async function calculateOutsideSpending(){

  const candidateNames = await getCandidateNames();  

  let transactions = await getFilteredTransactions();

  const outsideSpending = getSpendingAmounts(candidateNames, transactions);

  saveOutsideSpendingToJSON(outsideSpending);
}

calculateOutsideSpending();