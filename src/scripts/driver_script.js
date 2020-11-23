const { execSync } = require("child_process");

function processInput() {

  var args = require('yargs')
    .usage('Usage: $0 [--skip-download boolean]')
    .example('$0 --skip-download')
    .example('$0 --sk')
    .example('$0 --sk=true')
    .option('skip-download', {
        default:  false,
        describe: `Do not download csv files.`,
        type: 'boolean'
    })
    .alias('sk', 'skip-download')
    .version(false)
    .argv;

    return { downloadCSV: !args['skip-download'] }
}

/**
 * This runs several variations of Python commands and attempts to get the 
 *  version of Python installed. This returns the first command that returns
 *  a version of at least 3. This returns the command as a string.
 * @returns {string}
 */
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
  const input = processInput();

  const nodeCommand = 'node';
  const pythonCommand = getPythonCommand();

  if (!pythonCommand) { 

    console.log(`Error: Python version 3 not found`);
    process.exitCode = 1;

    return; 
  }

  /**
   * 'calculation_download_gdrive_info.py' needs to be run after preScripts since it 
   * updates/creates the JSON files and sets committee name to use as key in later scripts.
   */
  
  let preScripts = [];

  if (input.downloadCSV) {
    preScripts.push( { command: nodeCommand, fileName: 'download_csv_from_firebase.js' } );
  }

  const scripts = [
    ... preScripts,
    { command: pythonCommand, fileName: 'calculation_download_gdrive_info.py' },
    { command: pythonCommand, fileName: 'candidate_calculation_amount_raised.py' },
    { command: pythonCommand, fileName: 'candidate_calculation_amount_spent.py' },
    { command: pythonCommand, fileName: 'candidate_calculation_donor.py' },
    { command: pythonCommand, fileName: 'candidate_calculation_industry.py' },
    { command: pythonCommand, fileName: 'average_donation_calculation.py' },
    { command: pythonCommand, fileName: 'candidate_race_sum_calculation.py' },
    { command: nodeCommand, fileName: 'candidate_calc_outside_spending.js' },
    { command: nodeCommand, fileName: 'candidate_calculation_in_vs_out.js' },
    { command: nodeCommand, fileName: 'candidate_calculation_in_vs_out_district.js' },
    { command: nodeCommand, fileName: 'update_last_updated.js' },
  ];

  console.log('Rebuilding Candidate JSON files...');

  try{

    scripts.forEach( script => {
      console.log(` >> Running: ${script.command} ${script.fileName}`);
      execSync(`${script.command} ${script.fileName}`, { cwd: __dirname, stdio: 'inherit' });
    });

  } catch (error) {

    console.log(error.toString());
    console.log('Error: Candidate JSON files update NOT complete!');
    process.exitCode = 1;

    return;
  }

  console.log('Update of Candidate JSON files complete!');

})();
