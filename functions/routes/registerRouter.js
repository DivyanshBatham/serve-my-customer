const express = require('express');
const router = express.Router();
const adminSdk = require('../config/adminSdk');

router.get('/', (req, res, next) => {
  const uid = "123"
  adminSdk.auth().createCustomToken(uid)
    .then(customToken => {
      console.log(customToken);
      return res.status(201).json(customToken);
    }).catch(err => {
      console.error(err);
    })
});

module.exports = router;