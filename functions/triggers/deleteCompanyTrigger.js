const functions = require('firebase-functions');
const { firestore } = require('../config/adminSdk');

module.exports = functions.auth.user().onDelete((user) => {
    console.log("User Deleted: ", user);
    // const { admin: isAdmin, companyId } = user.customClaims;
    // TODO: What to do when employee is deleted?
    // Delete the Company Document (Only while in development):
    return firestore.collection("companies").doc(user.uid).delete();
});