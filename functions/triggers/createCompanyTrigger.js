const functions = require('firebase-functions');
const { firestore } = require('../config/adminSdk');

module.exports = functions.auth.user().onCreate(async (user) => {
    console.log("User Created: ", user);

    // Create a Company Document:
    await firestore.collection('companies').doc(user.uid).set({
        companyName: `${user.displayName}'s Company`,
    });
    
    // Create Admin Employee Document:
    return firestore.collection(`companies/${user.uid}/employees`).doc(user.uid).set({
        email: user.email,
        name: user.displayName,
        role: 'admin'
    });

});