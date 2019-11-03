const express = require('express');
const functions = require('firebase-functions');
const router = express.Router();
const { auth, firestore } = require('../config/adminSdk');

router.post('/', async (req, res, next) => {

    const { employeeId } = req.body;

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader === 'undefined')
        return res.status(401).json({
            "error": "idToken is required"
        });

    try {
        const idToken = bearerHeader.split(' ')[1];
        const claims = await auth.verifyIdToken(idToken);
        const { admin: isAdmin, companyId } = claims;

        if (!isAdmin)
            return res.status(403).json({
                "error": "Forbidden"
            });

        // Update User (Employee):
        const userDoc = await auth.updateUser(employeeId, {
            disabled: true
        })

        // Retrieve the timestamp of the revocation, in seconds since the epoch.
        // admin.auth().revokeRefreshTokens(uid)
        //     .then(() => {
        //         return admin.auth().getUser(uid);
        //     })
        //     .then((userRecord) => {
        //         return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
        //     })
        //     .then((timestamp) => {
        //         console.log('Tokens revoked at: ', timestamp);
        //     });

        await auth.revokeRefreshTokens(employeeId);
        // const accountRevokedAt = new Date(userDoc.tokensValidAfterTime).getTime() / 1000;
        const accountRevokedAt = new Date();

        // TODO: Implement FCM to force refresh client

        // Update employee document for logs:
        await firestore.collection(`companies/${companyId}/employees`).doc(employeeId).update({
            revokedAt: accountRevokedAt
        });

        return res.status(201).json({
            "message": `Disabled Employee Account (${employeeId})`,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "error": err
        })
    }

});


module.exports = router;