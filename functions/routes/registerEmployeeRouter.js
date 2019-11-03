const express = require('express');
const jwt = require('jsonwebtoken');
const functions = require('firebase-functions');
const router = express.Router();
const { auth, firestore } = require('../config/adminSdk');

router.post('/', async (req, res, next) => {

  const { password, phoneNumber, displayName } = req.body;

  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader === 'undefined')
    return res.status(401).json({
      "error": "inviteToken is required"
    });

  try {
    const inviteToken = bearerHeader.split(' ')[1];
    const payload = jwt.verify(inviteToken, functions.config().jwt.secret)
    const { sub: uid, email, companyId } = payload;

    // Update User (Employee):
    const user = await auth.updateUser(uid, {
      emailVerified: true,
      phoneNumber,
      password,
      displayName,
      // photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false
    })

    // Create Employee Document:
    await firestore.collection(`companies/${companyId}/employees`).doc(uid).set({
      email: user.email,
      name: user.displayName,
      role: 'employee'
    });
    
    // Generate Custom Token:
    const customToken = await auth.createCustomToken(uid);

    return res.status(201).json({
      "data": user,
      "token": customToken
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      "error": err
    })
  }

});


module.exports = router;