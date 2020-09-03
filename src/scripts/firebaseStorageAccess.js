const admin = require('firebase-admin');

/**
 * This is the private key file for the Firebase service account. 
 * It is intentionally not included in the repo. To run this each user 
 * who has access to the Firebase Project will need to generate their 
 * own private key file and place it into their copy of the repo. 
 * To download a private key go to the Firebase project setting and 
 * then to the Service accounts tab. Click on 'Generate new private key'
 * Place the downloaded JSON file in the same folder as this file.
 */

var serviceAccount = require("./san-diego-voters-voice-firebase-adminsdk-b05n3-106714a374.json");

module.exports.initializeStorage_voters_voice = () => {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://san-diego-voters-voice.firebaseio.com",
    storageBucket: "san-diego-voters-voice.appspot.com"
  });
  return admin.storage();

}
