const {execFileSync} = require("child_process");

try {
  // This can take about 10 minutes to complete
  execFileSync('node', ['download_transactions_to_csv.js']);

} catch(err) {
  console.error(err);
  return;
}

// Run 'calculation_download_gdrive_info.py' first since it updates/creates the JSON files 
// and sets committee name to use as key in later scripts.
execFileSync('python', ['calculation_download_gdrive_info.py']);

execFileSync('python', ['candidate_calculation_amount_raised.py']);
execFileSync('python', ['candidate_calculation_amount_spent.py']);

execFileSync('python', ['candidate_calculation_donor.py']);
execFileSync('python', ['candidate_calculation_industry.py']);

execFileSync('node', ['candidate_calc_outside_spending.js']);
