
const shared = require('./shared_routines.js');

/**
 * This uses the list of 'candidates' and for each it finds the sum of the matching transaction and
 *  stores it each candidates' 'keyFieldToSave' property. It then returns the updated candidates.
 * @param {object[]} candidates 
 * @param {string} keyFieldToSave 
 * @param {object[]} transactions 
 * @returns {object[]}
 */
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

/**
 * This updates the given 'jsonData' object to add sums to specific properties. 
 *  This is needed to match the format of the data stored in the json file. 
 * @param {object} sums 
 * @param {object} jsonData 
 * @returns {object}
 */
function writeSumsCallback( sums, jsonData ) {

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

  shared.saveCandidatesDataToFiles( candidates, sumsField, writeSumsCallback ) 

})();
