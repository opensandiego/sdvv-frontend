const {execFileSync} = require("child_process");

// Run first since it updates/creates the JSON files and sets committee name to use as key in later py scripts.
const download_info = execFileSync('python', ['calculation_download_gdrive_info.py']);

const download_transactions = execFileSync('node', ['download_transactions_to_csv.js']);

const amount_raised = execFileSync('python', ['candidate_calculation_amount_raised.py']);
const amount_spent = execFileSync('python', ['candidate_calculation_amount_spent.py']);

const donor = execFileSync('python', ['candidate_calculation_donor.py']);
const industry = execFileSync('python', ['candidate_calculation_industry.py']);

const outside_spending = execFileSync('node', ['candidate_calc_outside_spending.js']);
