const functions = require('firebase-functions');
const { firestore } = require('../config/adminSdk');

module.exports = functions.auth.user().onCreate((user) => {
    console.log("User Created: ", user);

    // Create a Company Document:
    return firestore.collection('companies').doc(user.uid).set({
        companyName: `${user.displayName}'s Company`,
    });
});