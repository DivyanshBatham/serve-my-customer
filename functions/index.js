const functions = require('firebase-functions');
const expressApp = require('./app');
const { createCompanyTrigger, deleteCompanyTrigger } = require('./triggers');

// HTTP Triggers:
exports.api = functions.https.onRequest(expressApp);

// Cloud Firestore Triggers:
exports.createCompanyDocument = createCompanyTrigger;
exports.deleteCompanyDocument = deleteCompanyTrigger;