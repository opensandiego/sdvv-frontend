const shared = require('./shared_routines.js');

/**
 * This updates the given 'jsonData' to add a value to specific property.
 *  This is needed to match the format of the data stored in the json file.
 * @param {string} value 
 * @param {object} jsonData
 * @returns {object}
 */
function writeDateCallback( value, jsonData ) {
  const key = "last-updated";

  jsonData[key] = value;

  return jsonData;
}

/**
 * This updates the given 'jsonData' to add a value to specific property.
 *  This is needed to match the format of the data stored in the json file.
 * @param {string} value 
 * @param {object} jsonData
 * @returns {object}
 */
function writeISODateCallback( value, jsonData ) {
  const key = "last-updated-iso";

  jsonData[key] = value;

  return jsonData;
}

(async () => {

  const now = new Date();
  const filePath = `${shared.YEAR}/candidates.json`;

  shared.updateJSONFileWithValue( 
    filePath, now.toLocaleDateString(), writeDateCallback 
  );

  shared.updateJSONFileWithValue( 
    filePath, now.toISOString(), writeISODateCallback 
  );

})();
