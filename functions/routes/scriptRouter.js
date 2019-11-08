const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res, next) => {

    try {
        let data = fs.readFileSync('./dist/serve-my-customer.js', 'utf8')
        
        let output = data.replace('<<<companyId>>>', 'LxfIdcIJAWU00AfIjixX772f19J3');

        fs.writeFileSync('./dist/output.js', output);
        
        res.download('./dist/output.js')

    } catch (err) {
        console.log(err);
        res.status(500).json({
            "error": err
        })
    }

});

module.exports = router;