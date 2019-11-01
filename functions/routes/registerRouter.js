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
    await auth.setCustomUserClaims(user.uid, {
      admin: true,
      companyId: user.uid
    });

    // Generate Custom Token:
    const customToken = await auth.createCustomToken(user.uid);

    // Company Document gets created via createCompanyTrigger
    
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