const express = require('express');
const router = express.Router();
const { auth } = require('../config/adminSdk');

router.post('/', async (req, res, next) => {

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
    // TODO: Add Email Verification Logic to Fuction Triggers
    await auth.setCustomUserClaims(user.uid, { companyAccount: true });

    // Generate Custom Token:
    // Could this go into race condition?
    const customToken = await auth.createCustomToken(user.uid);

    res.status(201).json({
      "data": user,
      "token": customToken
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      "error": err
    })
  }

});

module.exports = router;