const express = require('express');
const router = express.Router();
const { auth } = require('../config/adminSdk');

router.get('/', async (req, res, next) => {

  const { email, password, phoneNumber, displayName } = req.body;

  try {
    // Create User:
    const user = await auth.createUser({
      email,
      emailVerified: false,
      phoneNumber,
      password,
      displayName,
      // photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false
    })

    // Add Custom Claim:
    // TODO: Add this logic and Email verification to Triggers
    await auth.setCustomUserClaims(user.uid, { companyAccount: true });

    // Generate Custom Token:
    const customToken = await auth.createCustomToken(user.uid);

    res.status(201).json({
      "success": true,
      "data": user,
      "token": customToken
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      "success": false,
      "error": err
    })
  }

});

module.exports = router;