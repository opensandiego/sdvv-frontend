
const shared = require('./shared_routines.js');

function getCandidateSums( candidates, keyFieldToSave, transactions ) {

  const formTypeKey = 'Sup_Opp_Cd';
  const transactionAmountKey = 'Tran_Amt1';

  return candidates.map( candidate =>  {
    candidate[keyFieldToSave] = {};

    candidate[keyFieldToSave]['supportSum'] = transactions
    .filter( (transaction) => candidate['Candidate_Name'] === transaction['Candidate_Full_Name'])
    .filter( (transaction) =>  transaction[formTypeKey] === 'S')
    .reduce( (accumulator, currentValue) => accumulator + 
      Number.parseFloat(currentValue[transactionAmountKey]), 0).toFixed(0);

    candidate[keyFieldToSave]['opposedSum'] = transactions
    .filter( (transaction) => candidate['Candidate_Name'] === transaction['Candidate_Full_Name'])
    .filter( (transaction) =>  transaction[formTypeKey] === 'O')
    .reduce( (accumulator, currentValue) => accumulator + 
      Number.parseFloat(currentValue[transactionAmountKey]), 0).toFixed(0);

    return candidate;
  });

}

function writeSums( sums, jsonData ) {

  jsonData['support'] = sums['supportSum'];
  jsonData['oppose'] =  sums['opposedSum'];

  return jsonData;
}


(async () => {
  const candidateInformation = await shared.getCandidateInformation();
  const sumsField = 'supportOpposed';

  let  transactions = shared.getTransactions();
  transactions = shared.filterListOnKeyByArray( transactions, 'Form_Type', [ 'F496' ])
  transactions = shared.addCandidateFullNamesToTransactions(transactions);

  let candidates = getCandidateSums(candidateInformation, sumsField, transactions);

  candidates.map( candidate => {

    shared.updateJSONFileWithValue( 
      shared.getCandidateRelativeFilePath(candidate), 
      candidate[sumsField], // data to save to json
      writeSums // function to determine how the data will be saved
    );

  });

})();
