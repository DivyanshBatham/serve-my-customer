const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(418).json({
    message: "I'm a teapot"
  });
});

module.exports = router;