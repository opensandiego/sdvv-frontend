// @ts-check

const fs = require('fs');
const fsPromises = require('fs').promises;
const parse = require('csv-parse');
const parseSync = require('csv-parse/lib/sync');

async function getCandidateNames() {
  const filePath = '../assets/data/candidate_information.csv';
  const file = await fsPromises.open(filePath, 'r');
  const fileData = await file.readFile('utf8');
  await file.close();

  const records = parseSync(fileData, {
    columns: true, // Generates objects and infers columns names from the first line.
    skip_lines_with_empty_values: true,
    on_record: (record) => [record['Candidate_Name']],
  }).join(',').split(',');

  return records;
}

async function getCommittees(){
  const filePath = '../assets/data/outside_expenditures_total.csv';
  const file = await fsPromises.open(filePath, 'r');
  const fileData = await file.readFile('utf8');
  await file.close();

  const records = parseSync(fileData, {
    columns: true,
      
    on_record: (record) => {  // return as object
      if ( Number.isInteger( Number.parseInt(record['Filer_ID']) )) {
        const { Filer_ID, Candidate, Support, } = record;
        return { Filer_ID, Candidate, Support };
      }
    }
      
  });

  return records;
}

/**
 * 
 * @param {Object[]} committees List of committee details
 * @param {string} committees[].Candidate candidate name
 * @param {string[]} candidates List of candidate names
 * @returns {Object[]} List of committee details
 */
function filtercommitteesByCandidates(committees, candidates) {
  return committees.filter( committee => {
    return candidates.includes( committee.Candidate );    
  });
};

/**
 * 
 * @async
 * @return {Promise <Object[]>}
 */
async function getFilteredTransactions() {
  
  const path = '../assets/data/';
  const fileNames = ['netfile_api_2019.csv', 'netfile_api_2020.csv'];

  const transactionTypes = ['F496P3', 'F461P5'];

  let output = [];

  for await(const fName of fileNames) {

    const stream = fs.createReadStream( path + fName , { encoding: 'utf-8' }); //end: 1018, 

    const parser = stream.pipe(
      parse({
        columns: true,
        skip_lines_with_empty_values: true,
        // from: 998,
        // to_line: 1004,
        on_record: (record) => { 
          if ( transactionTypes.includes( record['Form_Type'] ) ) {
            const { NetFileKey, FilerStateId, Tran_Amt1, Form_Type, FilerName } = record;
            return { NetFileKey, FilerStateId, Tran_Amt1, Form_Type, FilerName }; 
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
 * @typedef {object} CommitteesExpending
 * @property {string} candidate Candidate name
 * @property {string[]} supportFilerIDs List of committee(candidate) IDs that support
 * @property {string[]} opposedFilerIDs List of committee(candidate) IDs that opposed
 */

/**
 * Returns an array of candidates and lists of committee IDs from ...
 * @param {Object[]} committees 
 * @param {string} committees[].Candidate candidate name
 * @param {string} committees[].Filer_ID committee(candidate) ID
 * @param {string} committees[].Support  Support = '1', Opposed = '0'
 * @param {string[]} candidateNames 
 * @returns {CommitteesExpending[]} List of committees with Expenditures affecting a candidate
 */
function getCandidatesWithPositions(committees, candidateNames) {
  let committeesExpending = [];

  candidateNames.forEach(candidate => {

    let supportArr = committees.filter( row => {
      return (row.Candidate === candidate && row.Support === '1')
    }).map( row => {
      return row.Filer_ID;
    });

    let opposedArr = committees.filter( row => {
      return (row.Candidate === candidate && row.Support === '0')
    }).map( row => {
      return row.Filer_ID;
    });


    if (supportArr.length > 0 || opposedArr.length > 0) {

      committeesExpending.push({ 
          candidate: candidate,
          supportFilerIDs: supportArr,
          opposedFilerIDs: opposedArr,
      });

    } 


  });
  
  return committeesExpending;
}


function getOutsideExpenditures(candidatesWithPositions, transactions){

  let candidatesSums = candidatesWithPositions.map(candidate => {
 
    // Get the sum of the Contribution and Expenditure transactions that support a candidate (supportFilerIDs)
    let supportSum = transactions.filter( (transaction) => {
      
      return candidate.supportFilerIDs.includes(transaction.FilerStateId);

    }).reduce( (accumulator, currentValue) => {

      return accumulator + Number.parseFloat(currentValue.Tran_Amt1);

    }, 0);

    // Get the sum of the Contribution and Expenditure transactions that oppose a candidate (opposedFilerIDs)
    let opposedSum = transactions.filter( (transaction) => {
      
      return candidate.opposedFilerIDs.includes(transaction.FilerStateId);

    }).reduce( (accumulator, currentValue) => {

      return accumulator + Number.parseFloat(currentValue.Tran_Amt1);

    }, 0);

    return {
      candidateName: candidate.candidate,
      supportSum,
      opposedSum
    };

  });

  return candidatesSums;
}


async function calculateCandidatePositions(){

  const candidateNames = await getCandidateNames();
  console.log('*** candidateNames');
  console.log(candidateNames);

  let committees = await getCommittees();
  console.log('*** All committees');
  console.log(committees);
  
  committees = filtercommitteesByCandidates( committees, candidateNames );
  console.log('*** Filterd committees');
  console.log(committees); 

  let candidatesWithPositions = getCandidatesWithPositions( committees, candidateNames )
  console.log('*** candidatesWithPositions');
  console.log(candidatesWithPositions);

  let transactions = await getFilteredTransactions();
  console.log('*** getFilteredTransactions');
  console.log(transactions[1]);
  console.log('Filtered transactions found: '+ transactions.length);

  const outsideExpenditures = getOutsideExpenditures(candidatesWithPositions, transactions);
  console.log('*** outsideExpenditures');
  console.log(outsideExpenditures);

  // saveOutsideExpenditurestoJSON(outsideExpenditures);
}

calculateCandidatePositions();