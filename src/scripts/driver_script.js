const {execFileSync} = require("child_process");
const firebase = require('./firebaseStorageAccess.js');
const fs = require('fs');

// IF one of these CSV files fail to download then some of the scripts using them will fail
const CSV_FILE_NAMES = [ 'netfile_api_2018.csv', 'netfile_api_2019.csv', 'netfile_api_2020.csv' ];
const ASSETS_PATH = '../assets/data';


async function downloadCSVFromFirebaseCloudStorage (fileNames, filePath){
  const bucket = firebase.initializeStorage_voters_voice().bucket();
  let fileNamesDownloaded = [];

  for await (fileName of fileNames) {
    const fileExists = await bucket.file(fileName).exists();

    if (!fileExists[0]) { continue }

    await bucket.file(fileName).download({
      destination: `${filePath}/${fileName}`
    });

    console.log(`${fileName} downloaded`)

    fileNamesDownloaded.push(fileName);

  }

  return fileNamesDownloaded;
}

function deleteLocalCSVFiles (fileNames, filePath){
  
  fileNames.forEach(fileName => {
    const path = `${filePath}/${fileName}`;

    try {
      fs.unlinkSync(path);
      console.log(`successfully deleted ${path}`);
    } catch (error) {
      console.error('there was an error:', error.message);
    }

  });
}

(async () => {
    
  try {
    const downloadedFileNames = await downloadCSVFromFirebaseCloudStorage(CSV_FILE_NAMES, ASSETS_PATH);

    // // This can take about 10 minutes to complete
    // execFileSync('node', ['download_transactions_to_csv.js']);
    
    // Run 'calculation_download_gdrive_info.py' first since it updates/creates the JSON files 
    // and sets committee name to use as key in later scripts.
    execFileSync('python', ['calculation_download_gdrive_info.py']);
    
    execFileSync('python', ['candidate_calculation_amount_raised.py']);
    execFileSync('python', ['candidate_calculation_amount_spent.py']);
    
    execFileSync('python', ['candidate_calculation_donor.py']);
    execFileSync('python', ['candidate_calculation_industry.py']);
    
    execFileSync('node', ['candidate_calc_outside_spending.js']);

    deleteLocalCSVFiles(downloadedFileNames, ASSETS_PATH);

  } catch(err) {
    console.error(err);
    return;
  }

})();

