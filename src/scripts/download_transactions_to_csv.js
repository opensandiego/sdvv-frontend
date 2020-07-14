const https = require('https');
const fs = require('fs');


function doGetRequest(requestUrl) {

  return new Promise( (resolve, reject) => {
    https.get(requestUrl, (res) => {
      let data = '';

      if (res.statusCode === 200) {
        console.log('Request status: OK');
      } else {
        console.log('Bad response. Status code: ', res.statusCode);
      }

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
      
      res.on('error', (err) => {
        reject(err);
      })
    });

  });

}

/** 
 * showSuperceded
 * false = Only get the most Recently amended versions of transactions (same as Export Amended)
 * true = Include all transactions including those that have been ammeded by later filings
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
  const fileFolder = '../assets/data/';
  const fileNamePrefix = 'netfile_api';
  const fileNameSuperceded = showSuperceded ? 'all_' : '';
  const filePath = `${fileFolder}${fileNamePrefix}_${fileNameSuperceded}${year}.csv`;

  const requestUrlJSON = getTransactionYearRequestUrl({
    aid: aid, 
    year: year,
    fileFormat: 'json',
    showSuperceded: showSuperceded
  });

  const recordCount = (JSON.parse(await doGetRequest(requestUrlJSON))).totalMatchingCount;
  const totalPages = Math.ceil(recordCount / pageSize);

  let writeStream = fs.createWriteStream(filePath, {flags: 'w'});

  console.log(`${recordCount} rows to write to \'${filePath}\' using ${totalPages} API requests.`);
  
  for (let currentPageIndex = 0; currentPageIndex < totalPages; currentPageIndex++) {
    console.log('Requesting page: ' + currentPageIndex);

    const requestUrlCSV = getTransactionYearRequestUrl({
      aid: aid, 
      year: year,
      pageIndex: currentPageIndex,
      pageSize: pageSize,
      fileFormat: 'csv',
      showSuperceded: showSuperceded
    });

    let csvData = await doGetRequest(requestUrlCSV);
    
    // Write column header row to file
    if ( currentPageIndex === 0 ) {
      writeStream.write( csvData.split('\n')[0] );
    }

    // Write the non-header rows to file
    writeStream.write( csvData.substring( csvData.indexOf('\n') + 1 ) );

  }
  
  writeStream.on('finish', () => {
    console.log('File write done. Download complete.')
  });

  writeStream.end();

}


module.exports = {
  downloadTransactionsByYear: function(year) { downloadTransactions(32, year) },
};

module.exports.downloadTransactionsByYear(2020);
