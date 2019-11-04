const express = require('express');
const jwt = require('jsonwebtoken');
const functions = require('firebase-functions');
const router = express.Router();
const { auth, firestore } = require('../config/adminSdk');

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

    // Create Company Document:
    await firestore.collection('companies').doc(user.uid).set({
      companyName: `${user.displayName}'s Company`,
    });

    // Create Employee Document:
    await firestore.collection(`companies/${user.uid}/employees`).doc(user.uid).set({
      email: user.email,
      name: user.displayName,
      role: 'admin'
    });

    // Generate Custom Token:
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