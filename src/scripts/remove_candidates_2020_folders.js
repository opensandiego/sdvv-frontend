const fs = require('fs');
const del = require('del');

const CANDIDATES_PATH = '../assets/candidates';

/**
 * This script removes the folders and json files within the CANDIDATES_PATH. 
 *  This is needed to clear out any old assets that should not be referenced.
 */
(() => {

  const path = `${CANDIDATES_PATH}/2020`;

  if ( !fs.existsSync(path) ) {
    
    console.error(`The path '${path} does not exist`);
    return;

  } else {

    del.sync([`${path}/*`, `!${path}/campaign_race_totals.json`], { force: true });

  }

})();
