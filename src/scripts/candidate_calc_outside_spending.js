
const fs = require('fs');
const fetch = require('node-fetch');
const parse = require('csv-parse');
const parseSync = require('csv-parse/lib/sync');

const CANDIDATE_INFORMATION_URL = "https://docs.google.com/spreadsheets/d/1mENueYg0PhXE_MA9AypWWBJvBLdY03b8H_N_aIW-Ohw/export?format=csv&gid=0";
const ASSETS_PATH = '../assets/data';
const CANDIDATES_PATH = '../assets/candidates';
const NETFILE_API_CSV_FILENAMES = ['netfile_api_2018.csv', 'netfile_api_2019.csv', 'netfile_api_2020.csv'];


/**
 * @typedef Candidates
 * @type {object}
 * @property {string} Candidate_Name - 
 * @property {string} Office - 
 * @property {string} Year - 
 */

/**
 * Reads from a Google Sheet and returns an array of candidate information objects.
 * @returns {Promise <Candidates[]>}
 */
async function getCandidateInformation() {
  let response, fileData;

  try {
    response = await fetch(CANDIDATE_INFORMATION_URL);
    fileData = await response.text();
  } catch (error) {
    console.log(error);
  }

  const records = parseSync(fileData, {
    columns: true,
    skip_lines_with_empty_values: true,
    on_record: (record) => { 

      // Filter the columns
      const { Candidate_Name, Office, Year } = record;

      return { Candidate_Name, Office, Year };
     }
  });
  
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
 * Reads transactions from csv files and returns those that represent outside spending
 * @returns {Promise <Transactions[]>}
 */
async function getFilteredTransactions() {
  
  const transactionTypes = ['F496'];

  let output = [];

  for await(const fName of NETFILE_API_CSV_FILENAMES) {

    const stream = fs.createReadStream( `${ASSETS_PATH}/${fName}` , { encoding: 'utf-8' });

    const parser = stream.pipe(
      parse({
        columns: true,
        skip_lines_with_empty_values: true,
        on_record: (record) => { 

          // check if the value in column Form_Type matches one of the values in transactionTypes
          if ( transactionTypes.includes( record['Form_Type'] ) ) {            

            const { Tran_Amt1, Cand_NamL, Cand_NamF, Sup_Opp_Cd } = record;

            // The Candidate names in Cand_NamL, Cand_NamF are not constant. 
            // For some the name is only in Cand_NamL for others it is split between Cand_NamL and Cand_NamF. 
            // This assignment makes them consistent.
            let Candidate_Full_Name = Cand_NamF === '' ? Cand_NamL : `${Cand_NamF} ${Cand_NamL}`;

            return { Tran_Amt1, Candidate_Full_Name, Sup_Opp_Cd }; 
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
 * @property {string} office - The office the Candidate is running for
 * @property {string} year - The election year that the Candidate running in
 * @property {number} supportSum - Decimal number for the sum of all spending in support of a candidate
 * @property {number} opposedSum - Decimal number for the sum of all spending in opposition to a candidate
 */

/**
 * Reads a list of candidates and a list of transactions. Returns the total spent on supporting or opposing each candidate.
 * @param {string[]} candidateInformation - 
 * @param {Transactions[]} transactions - 
 * @returns {CandidateSpending[]}
 */
function getSpendingAmounts(candidateInformation, transactions) {

  let candidateSums = candidateInformation.map( candidate =>  {

    let supportSum = transactions
    .filter( (transaction) => candidate.Candidate_Name  === transaction.Candidate_Full_Name)
    .filter( (transaction) =>  transaction.Sup_Opp_Cd === 'S')
    .reduce( (accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.Tran_Amt1), 0);

    let opposedSum = transactions
    .filter( (transaction) => candidate.Candidate_Name  === transaction.Candidate_Full_Name)
    .filter( (transaction) =>  transaction.Sup_Opp_Cd === 'O')
    .reduce( (accumulator, currentValue) => accumulator + Number.parseFloat(currentValue.Tran_Amt1), 0);

    return {
      candidateName: candidate.Candidate_Name,
      office: candidate.Office,
      year: candidate.Year,
      supportSum,
      opposedSum
    };
    
  });

  return candidateSums;
}


/**
 * For each candidate this writes the total outside spending to support and oppose them.  
 * @param {CandidateSpending[]} outsideSpending 
 */
function saveOutsideSpendingToJSON(outsideSpending) {
  
  for (const candidate of outsideSpending) {

    // Replace all spaces in candidate names and office with underscores '_'
    const candidatePathName = candidate.candidateName.split(' ').join('_').toLowerCase();
    const office = candidate.office.split(' ').join('_').toLowerCase();

    const filePath = `${CANDIDATES_PATH}/${candidate.year}/${office}/${candidatePathName}/${candidatePathName}.json`;

    let updatedFileData;
    try {

      // Skip candidates who do not have a JSON file.
      if ( !fs.existsSync(filePath) ) {
        continue;
      }

      const fileData = fs.readFileSync(filePath, 'utf8' );

      let json = JSON.parse(fileData);
      json['support'] = candidate.supportSum.toFixed();
      json['oppose'] =  candidate.opposedSum.toFixed();
      updatedFileData = JSON.stringify(json, null, 2);

      fs.writeFileSync(filePath, updatedFileData + '\n', 'utf8');

    } catch (error) {
      console.log(error);
    }

  }

}

/**
 * Entry function of script
 */
async function calculateOutsideSpending(){

  const candidateInformation = await getCandidateInformation();

  const transactions = await getFilteredTransactions();

  const outsideSpending = getSpendingAmounts(candidateInformation, transactions);

  saveOutsideSpendingToJSON(outsideSpending);
}

calculateOutsideSpending();
