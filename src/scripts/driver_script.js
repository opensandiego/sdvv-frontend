const fs = require('fs');
const fetch = require('node-fetch');
const { execFileSync } = require("child_process");

// If one of these CSV files fail to download then some of the scripts using them will fail
const CSV_FILE_NAMES = [ 'netfile_api_2018.csv', 'netfile_api_2019.csv', 'netfile_api_2020.csv' ];
const ASSETS_PATH = '../assets/data';

async function downloadCSVFromFirebaseCloudStorage (fileNames, filePath){
  const encodedPath = 'data%2F';

  for await (fileName of fileNames) {
    const firebaseStorageLocation = 
      `https://firebasestorage.googleapis.com/v0/b/san-diego-voters-voice.appspot.com/o/${encodedPath}${fileName}?alt=media`;

    const fetchResponse = await fetch(firebaseStorageLocation);
    const body = await fetchResponse.text();

    fs.writeFileSync(`${filePath}/${fileName}`, body);

    console.log(`Remote file '${fileName}' downloaded to '${filePath}/${fileName}'`);
  }

}

(async () => {
    
  try {
    await downloadCSVFromFirebaseCloudStorage(CSV_FILE_NAMES, ASSETS_PATH);
    
    // Run 'calculation_download_gdrive_info.py' first since it updates/creates the JSON files 
    // and sets committee name to use as key in later scripts.
    execFileSync('python', ['calculation_download_gdrive_info.py']);
    
    execFileSync('python', ['candidate_calculation_amount_raised.py']);
    execFileSync('python', ['candidate_calculation_amount_spent.py']);
    
    execFileSync('python', ['candidate_calculation_donor.py']);
    execFileSync('python', ['candidate_calculation_industry.py']);
    
    execFileSync('node', ['candidate_calc_outside_spending.js']);

    console.log('Update of Candidate JSON files complete.')

  } catch(err) {
    console.error(err);
    return;
  }

})();

