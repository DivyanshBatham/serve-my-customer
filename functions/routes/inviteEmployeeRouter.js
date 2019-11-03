const express = require('express');
const jwt = require('jsonwebtoken');
const functions = require('firebase-functions');
const router = express.Router();
const { auth, firestore, admin } = require('../config/adminSdk');
const { sendgrid, SENDGRID_INVITATION_TEMPLATE_ID } = require('../config/sendgrid');

router.post('/', async (req, res, next) => {

    const { email } = req.body;
    const bearerHeader = req.headers['authorization'];

    if (!email)
        return res.status(401).json({
            "error": "Email is required"
        });
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
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
        const companyDoc = await firestore.doc(`companies/${companyId}`).get();
        const { companyName } = companyDoc.data();

        // Create Employee Invite Document:
        await firestore.collection(`companies/${companyId}/invites`).doc(email).set({
            email,
            invitedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Create Invite Token:
        const inviteToken = jwt.sign(
            {
                email,
                companyId,
                companyName,
            },
            functions.config().jwt.secret,
            { expiresIn: '7d' }
        );
        
        // Generate email message
        const msg = {
            to: email,
            from: 'no-reply@servemycustomer.com',
            templateId: SENDGRID_INVITATION_TEMPLATE_ID,
            dynamic_template_data: {
                companyName,
                ctaUrl: `https://serve-my-customer.firebaseapp.com/register?inviteToken=${inviteToken}&companyName=${companyName}`
            },
        };

        // Send email
        await sendgrid.send(msg);

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