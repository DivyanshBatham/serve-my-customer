const express = require('express');
const router = express.Router();
const { auth, firestore, admin } = require('../config/adminSdk');

router.post('/', async (req, res, next) => {

    const { email } = req.body;
    const bearerHeader = req.headers['authorization'];

    if (!email)
        return res.status(401).json({
            "error": "Email is required"
        });
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        return res.status(401).json({
            "error": "Invalid Email"
        });

    if (typeof bearerHeader === 'undefined')
        return res.status(401).json({
            "error": "idToken is required"
        });

    try {
        const idToken = bearerHeader.split(' ')[1];
        const claims = await auth.verifyIdToken(idToken);
        const { companyId, admin: isAdmin } = claims;

        if (!isAdmin)
            return res.status(403).json({
                "error": "Forbidden"
            });

        // Get Company Doc using companyId:
        // const companyDoc = await firestore.doc(`companies/${companyId}`).get();
        // const { companyName } = companyDoc.data();

        // Create Employee Invite Document:
        await firestore.collection(`companies/${companyId}/invites`).doc(email).set({
            email,
            invitedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // TODO: From trigger:
        // // Generate Invite Token:
        // const inviteToken = await auth.createCustomToken(email, {
        //     companyId,
        //     companyName
        // });

        // console.log(inviteToken);
        // // Send Email: (companyId, companyName, email)

        return res.status(201).json({
            "message": "Email Sent",
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "error": err
        })
    }

});

module.exports = router;