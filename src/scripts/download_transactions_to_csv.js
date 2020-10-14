const fs = require('fs');
const cliProgress = require('cli-progress');
const shared = require('./shared_routines.js');

/**
 * Takes an object with multiple parameters and returns a NetFile API request URL from them.
 * @param {number} param.aid 
 * @param {number} param.year 
 * @param {number} param.pageIndex 
 * @param {number} param.pageSize
 * @param {string} param.fileFormat - either 'csv' or 'json'
 * @param {boolean} param.showSuperceded 
 */
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

/**
 * Downloads transaction data in CSV format from NetFile API using provided options and save to a local file.
 * @param {number} options.aid - Agency ID code
 * @param {number} options.year - Year to download transactions for
 * @param {boolean} options.showSuperceded 
 *    options.showSuperceded = false - Only get the most Recently amended versions of transactions (same as Export Amended)
 *    options.showSuperceded = true - Include all transactions including those that have been amended by later filings
 */
async function downloadTransactions(options){
  let { aid, year, showSuperceded } = options;

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

    bar1.increment( netFileData[netFileData.length-1].split("\n").length - 2 );

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

/**
 * Uses the yargs package to process the command line parameters and returns them in a object.
 */
function processInput() {
  const currentYear = new Date().getFullYear();
  const validYearRangeText = `2005 < year <= ${currentYear}`;

  var args = require('yargs')
    .usage('Usage: $0 --aid num [--year num]')
    .example('$0 --aid 32 --year 2019')
    .option( 'aid' , {
        describe: 'Agency ID code',
        type: 'number'
    })
    .default('aid', 32)
    .coerce('aid', arg => {
      if (Number.isInteger(arg)) { return arg } 
      else throw new Error(`aid must be a number (integer)`) 
    })
    .option( 'year', {
        default: currentYear,
        describe: `Year to download transactions for\n ${validYearRangeText}`,
        type: 'number'
    })
    .coerce('year', arg => {
      if (arg > 2005) { return arg } 
      else throw new Error(`year must be within range: ${validYearRangeText}`) 
    })
    .epilog('For a list of AID codes see: https://netfile.com/Connect2/api/public/campaign/agencies ')
    .version(false)
    .argv;

  if ( !(args.year && args.aid) ) {
    throw new Error(`Missing valid command line arguments`);
  }

  return { aid: args.aid, year: args.year, showSuperceded: false }
}


(async () => {
  const input = processInput();

  await downloadTransactions(input);
})();
