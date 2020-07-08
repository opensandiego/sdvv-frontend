const https = require('https');
const fs = require('fs');


function doGetRequest({
  urlPrefix,
  aid,
  year,
  pageIndex = 0,
  pageSize = 1,
  fileFormat = 'csv'
  }) {

  const showSuperceded = false; // false = Most Recently amended version of the transactions only (same as Export Amended)
  const requestUrl = `${urlPrefix}?Aid=${aid}&Year=${year}&CurrentPageIndex=${pageIndex}&PageSize=${pageSize}&&ShowSuperceded=${showSuperceded}&format=${fileFormat}`;

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
        resolve( data );
      });
      
      res.on('error', (err) => {
        reject(err);
      })
    });

  });

}


async function downloadTransactions(aid, year){

  const location = '../assets/data/';
  const fileName = `netfile_api_transactions_${year}.csv`;
  const pageSize = 1000;
  
  const recordCount = (JSON.parse(await doGetRequest({
    urlPrefix: 'https://netfile.com:443/Connect2/api/public/campaign/export/cal201/transaction/year',
    aid: aid, 
    year: year,
    fileFormat: 'json'
  }))).totalMatchingCount;

  const totalPages = Math.ceil(recordCount / pageSize);

  let writeStream = fs.createWriteStream(location + fileName, {flags: 'w'});

  console.log(`${recordCount} rows to write to \'${location}${fileName}\' using ${totalPages} API requests.`);
  
  for (let currentPageIndex = 0; currentPageIndex < totalPages; currentPageIndex++) {
    console.log('Requesting page: ' + currentPageIndex);

    let csvData = await doGetRequest({
      urlPrefix: 'https://netfile.com:443/Connect2/api/public/campaign/export/cal201/transaction/year/csv',
      aid: aid, 
      year: year,
      pageIndex: currentPageIndex,
      pageSize: pageSize,
      fileFormat: 'csv'
    });
    
    if ( currentPageIndex === 0 ) {
      writeStream.write( csvData.split('\n')[0] );
    }

    writeStream.write( csvData.substring( csvData.indexOf('\n') + 1 ) );

  }
  
  writeStream.on('finish', () => {
    console.log('File write done. Download complete.')
  });

  writeStream.end();

}


module.exports = {
  download2019Transactions: function() { downloadTransactions(32, 2019) },
  download2020Transactions: function() { downloadTransactions(32, 2020) },
  downloadTransactionsByYear: function(year) { downloadTransactions(32, year) },
};

module.exports.download2020Transactions();
