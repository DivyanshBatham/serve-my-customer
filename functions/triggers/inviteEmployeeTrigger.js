const functions = require('firebase-functions');
const { firestore } = require('../config/adminSdk');

module.exports = functions.firestore
    .document('companies/{companyId}/invites/{employeeEmail}')
    .onCreate(async (change, context) => {
        const { companyId, employeeEmail } = context.params;

        // Get Company Doc using companyId:
        const companyDoc = await firestore.doc(`companies/${companyId}`).get();
        const { companyName } = companyDoc.data();

        // Create Token:
        const token = {
            companyId,
            companyName,
            employeeEmail
        }
        console.log(token);
        // Send Invite Email:
        return token;
    });