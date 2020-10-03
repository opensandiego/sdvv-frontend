const fs = require('fs');
const del = require('del');

const CANDIDATES_PATH = '../assets/candidates';

(() => {

  const path = `${CANDIDATES_PATH}/2020`;

  if ( !fs.existsSync(path) ) {
    
    console.error(`The path '${path} does not exist`);
    return;

  } else {

    del.sync([`${path}/*`, `!${path}/campaign_race_totals.json`], { force: true });

  }

})();