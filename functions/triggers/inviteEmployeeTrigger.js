const functions = require('firebase-functions');
const { firestore } = require('../config/adminSdk');
const { sendgrid, SENDGRID_INVITATION_TEMPLATE_ID } = require('../config/sendgrid');

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

        const msg = {
            to: employeeEmail,
            from: 'no-reply@servemycustomer.com',
            templateId: SENDGRID_INVITATION_TEMPLATE_ID,
            dynamic_template_data: {
                companyName,
            },
        };

        // Send Invite Email:
        return sendgrid.send(msg);
    });