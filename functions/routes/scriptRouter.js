const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.download('./client/dist/serve-my-customer.js', 'script.js')
    // res.status(418).json({
    //     message: "I'm a script teapot"
    // });
});

module.exports = router;