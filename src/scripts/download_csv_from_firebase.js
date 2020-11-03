const fs = require('fs');
const fetch = require('node-fetch');

const shared = require('./shared_routines.js');

 /**
  * This downloads files from Firebase Storage and saves them to the local system.
  * @param {string[]} fileNames - names of the files to download from Firebase
  * @param {string} localFilePath - path on the local system to save the downloaded files into
  */
 async function downloadCSVFromFirebaseCloudStorage (
   fileNames = shared.NETFILE_API_CSV_FILENAMES, localFilePath = shared.DATA_PATH ) {

  const encodedPath = encodeURIComponent('data/');

  for await (fileName of fileNames) {
    const firebaseStorageLocation = 
      `https://firebasestorage.googleapis.com/v0/b/san-diego-voters-voice.appspot.com/o/${encodedPath}${fileName}?alt=media`;

    const fetchResponse = await fetch(firebaseStorageLocation);
    const body = await fetchResponse.text();

    fs.writeFileSync(`${localFilePath}/${fileName}`, body);

    console.log(`  Downloading remote file '${fileName}' from Firebase Storage \n  To '${localFilePath}/${fileName}'`);
  }

}

(async () => {
  await downloadCSVFromFirebaseCloudStorage();
})();


module.exports = {
  downloadCSVFromFirebaseCloudStorage
};
