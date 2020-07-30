// @ts-check

const fs = require('fs');
const parse = require('csv-parse');
const parseSync = require('csv-parse/lib/sync');
const { toFixed } = require('core-js/fn/number/epsilon');


function getCandidateNames() {
  const filePath = '../assets/data/candidate_information.csv';
  const fileData = fs.readFileSync(filePath, 'utf8');

  const records = parseSync(fileData, {
    columns: true,
    skip_lines_with_empty_values: true,
    on_record: (record) => [record['Candidate_Name']]
  }).join(',').split(',');

  return records;
}


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

            const { NetFileKey, FilerStateId, FilerName, 
              Tran_Amt1, Cand_NamL, Cand_NamF, Sup_Opp_Cd } = record;

            // The Candidate names in Cand_NamL, Cand_NamF are not constant. For some the names is only in Cand_NamL for others it is split between Cand_NamL and Cand_NamF. This assignment makes them consistant.
            let Candidate_Full_Name = Cand_NamF === '' ? Cand_NamL : `${Cand_NamF} ${Cand_NamL}`;

            return { NetFileKey, FilerStateId, FilerName, 
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
    
  })
  .filter( candidate => candidate.supportSum > 0 || candidate.opposedSum > 0 );

  return candidateSums;
}


function saveOutsideSpendingtoJSON(outsideSpending) {
  const pathPrefix = '../assets/candidates/2020/mayor/';

  for (const candidate of outsideSpending) {

    const candidatePathName = candidate.candidateName.replace(' ', '_').toLowerCase();
    const filePath = pathPrefix + `${candidatePathName}/${candidatePathName}.json`;

    let updatedFileData;
    try {

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

  return null;
}


async function main(){
  
  const candidateNames = getCandidateNames();
  console.log('*** candidateNames');
  console.log(candidateNames);

  let transactions = await getFilteredTransactions();
  console.log('*** getFilteredTransactions');
  console.log(transactions.slice(0, 1));
  console.log('Filtered transactions found: '+ transactions.length);

  const outsideSpending = getSpendingAmounts(candidateNames, transactions);
  console.log('*** outsideSpending');
  console.log(outsideSpending);

  saveOutsideSpendingtoJSON(outsideSpending);
}

main();