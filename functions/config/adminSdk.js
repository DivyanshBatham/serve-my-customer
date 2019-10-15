var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

var adminSdk = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = adminSdk