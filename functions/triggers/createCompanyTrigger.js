const functions = require('firebase-functions');
const { firestore } = require('../config/adminSdk');

module.exports = functions.auth.user().onCreate(async (user) => {
    console.log("User Created: ", user);
    const { admin: isAdmin, companyId } = user.customClaims;
    // CLAIMS ARE EMPTY HERE 😢
    // console.log("User Custom Claims: ", user.customClaims);
    // console.log(isAdmin, companyId);
    if (isAdmin) {
        // Create a Company Document:
        await firestore.collection('companies').doc(user.uid).set({
            companyName: `${user.displayName}'s Company`,
        });
    }

    // Create Employee Document:
    return firestore.collection(`companies/${companyId}/employees`).doc(user.uid).set({
        email: user.email,
        name: user.displayName,
        role: isAdmin ? 'admin' : 'employee'
    });

});