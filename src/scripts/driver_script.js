const fs = require('fs');
const fetch = require('node-fetch');
const { execSync } = require("child_process");

// If one of these CSV files fails to download then some of the scripts using them will fail
const CSV_FILE_NAMES = [ 'netfile_api_2018.csv', 'netfile_api_2019.csv', 'netfile_api_2020.csv' ];
const ASSETS_PATH = `${__dirname}/../assets/data`;

async function downloadCSVFromFirebaseCloudStorage (fileNames, filePath){
  const encodedPath = encodeURIComponent('data/');

  for await (fileName of fileNames) {
    const firebaseStorageLocation = 
      `https://firebasestorage.googleapis.com/v0/b/san-diego-voters-voice.appspot.com/o/${encodedPath}${fileName}?alt=media`;

    const fetchResponse = await fetch(firebaseStorageLocation);
    const body = await fetchResponse.text();

    fs.writeFileSync(`${filePath}/${fileName}`, body);

    console.log(`Downloading remote file '${fileName}' from Firebase Storage \n To '${filePath}/${fileName}'`);
  }

}

function getPythonCommand() {
  const commands = ['python', 'py -3', 'python3'];
  const pythonMinimumVersion = 3;

  const found = commands.findIndex( command => {
    try{
      let results = execSync(`${command} --version`, { stdio: 'pipe' });
      let majorVersion = results.toString().split(' ')[1].trim()[0];

      return majorVersion >= pythonMinimumVersion;
    } catch(error) {
      return false;
    }    
  });

  return (found >= 0) ? commands[found] : undefined
}


(async () => {
  await downloadCSVFromFirebaseCloudStorage(CSV_FILE_NAMES, ASSETS_PATH);

  const pythonCommand = getPythonCommand();

  if (!pythonCommand) { 
    console.log(`Python version 3 not found`);
    return; 
  }

  console.log('Rebuilding Candidate JSON files...');

  /**
   * 'calculation_download_gdrive_info.py' needs to be first since it updates/creates 
   * the JSON files and sets committee name to use as key in later scripts.
   */
  const pythonScripts = [
    'calculation_download_gdrive_info.py', 
    'candidate_calculation_amount_raised.py', 
    'candidate_calculation_amount_spent.py', 
    'candidate_calculation_donor.py', 
    'candidate_calculation_industry.py',
  ];

  pythonScripts.forEach( scriptFile => {
    execSync(`${pythonCommand} ${scriptFile}`, { cwd: __dirname });
  });


  const nodeScripts = [
    'candidate_calc_outside_spending.js',
  ];

  nodeScripts.forEach( scriptFile => {
    execSync(`node ${scriptFile}`, { cwd: __dirname });
  });

  console.log('Update of Candidate JSON files complete!');

})();
