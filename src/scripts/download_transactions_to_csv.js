const https = require('https');
const fs = require('fs');
const cliProgress = require('cli-progress');
const shared = require('./shared_routines.js');

/** 
 * showSuperceded
 * false = Only get the most Recently amended versions of transactions (same as Export Amended)
 * true = Include all transactions including those that have been amended by later filings
 * 
 * */ 

function getTransactionYearRequestUrl({
  aid,
  year,
  pageIndex = 0,
  pageSize = 1,
  fileFormat,
  showSuperceded
  }) {

  let urlPrefix = '';

  if (fileFormat === 'csv') {
    urlPrefix = 'https://netfile.com:443/Connect2/api/public/campaign/export/cal201/transaction/year/csv';
  } else if (fileFormat === 'json') {
    urlPrefix ='https://netfile.com:443/Connect2/api/public/campaign/export/cal201/transaction/year';
  }

  const queryString = `?Aid=${aid}&Year=${year}&CurrentPageIndex=${pageIndex}&PageSize=${pageSize}&&ShowSuperceded=${showSuperceded}&format=${fileFormat}`;

  return urlPrefix + queryString;

}

async function downloadTransactions(aid, year, showSuperceded = false){
  const pageSize = 1000;
  const fileNameSuperceded = showSuperceded ? 'all_' : '';
  const filePath = `${shared.ASSETS_PATH}/data/netfile_api_${fileNameSuperceded}${year}.csv`;

  const requestUrlJSON = getTransactionYearRequestUrl({
    aid: aid, 
    year: year,
    fileFormat: 'json',
    showSuperceded: showSuperceded
  });

  const recordCount = (JSON.parse(await shared.doGetRequest(requestUrlJSON))).totalMatchingCount;
  const totalPages = Math.ceil(recordCount / pageSize);

  let netFileData = [];
  let num = 5;
    
  const bar1 = new cliProgress.SingleBar({
    format: 'Downloading from NetFile API |' + ('{bar}') + '| {percentage}% || {value}/{total} Transactions for ' + year,
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
  });
  bar1.start(recordCount, 0);

  for (let currentPageIndex = 0; currentPageIndex < totalPages; currentPageIndex++) {

    const requestUrl = getTransactionYearRequestUrl({
      aid: aid, 
      year: year,
      pageIndex: currentPageIndex,
      pageSize: pageSize,
      fileFormat: 'csv',
      showSuperceded: showSuperceded
    });

    netFileData.push( await shared.doGetRequest(requestUrl) );

    bar1.increment(pageSize);
  }
  bar1.stop();

  // Get the header row for the CSV data
  const headerRow = ''.concat( netFileData[0].split('\n')[0] + '\n' );

  const transactionsData = netFileData
    .map( transactions => transactions.substring( transactions.indexOf('\n') + 1 ) )
    .join('');

  const fileData = headerRow + transactionsData;

  // save file to disk
  fs.writeFileSync(filePath, fileData, 'utf8');
  console.log(`${recordCount} Transactions saved to:\n ${filePath}`)

}


module.exports = {
  downloadTransactionsByYear: function(year) { downloadTransactions(32, year) },

  downloadTransactions2020Election: async (aid = 32) => {
    // await downloadTransactions(aid, 2019);
    await downloadTransactions(aid, 2020);
  },

};

// const {argv} = require('yargs')
(async () => {
  module.exports.downloadTransactions2020Election();
})();
