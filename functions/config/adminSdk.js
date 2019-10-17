const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

// This is the way to initialize non function apps:
const adminSdk = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// For a functions app, we can simply do this:
// const adminSdk = admin.initializeApp(functions.config().firebase);

// For goggle cloud platform app:
// const adminSdk = admin.initializeApp({
//     credential: admin.credential.applicationDefault
// });


// Export separately
const auth = adminSdk.auth();
const firestore = adminSdk.firestore()

module.exports = { auth, firestore };