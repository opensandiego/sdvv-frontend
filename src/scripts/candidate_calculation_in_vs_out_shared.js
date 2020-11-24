
 /**
  * This checks to see if a 'key' exists in the 'jsonData' and
  *  if not then assign it a value to match that from a given json file.
  * @param {object} object - this is a structured json file data
  * @param {string} key 
  * @returns {object}
  */
 function createPropertyIfNotExist(jsonData, key) {
  if ( !jsonData.hasOwnProperty(key) ) {
    jsonData[key] = [ { } ];
  }

  return jsonData;
}

/**
 * This updates the given 'jsonData' to add a value to specific property.
 *  This is needed to match the format of the data stored in the json file.
 * @param {string} value 
 * @param {object} jsonData
 * @returns {object}
 */
function writeToInOutCallback( value, jsonData ) {
  const key = "in vs out district";
  jsonData = createPropertyIfNotExist(jsonData, key);

  jsonData[key][0] = value;

  return jsonData;
}


module.exports = {
  writeToInOutCallback,
  zipCodeKey: 'Tran_Zip4',
  sumsField: 'inAndOut',
};
