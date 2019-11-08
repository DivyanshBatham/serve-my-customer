const express = require('express');
const fs = require('fs');
const { auth } = require('../config/adminSdk');
const router = express.Router();

router.get('/', async (req, res, next) => {

    const bearerHeader = req.headers['authorization'];

    try {
        const idToken = bearerHeader.split(' ')[1];
        const claims = await auth.verifyIdToken(idToken);
        const { companyId } = claims;

        let data = fs.readFileSync('./dist/serve-my-customer.js', 'utf8')

        let output = data.replace('<<<companyId>>>', companyId);

        res.attachment('serve-my-customer.js');
        res.type('application/javascript');
        res.send(output);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            "error": err
        })
    }

});

module.exports = router;