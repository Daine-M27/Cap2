const express = require('express');
const router = express.Router();

/* GET galleries listing. */
router.get('/api/v1/galleries', function(req, res, next) {
    res.send('respond with a resource');
});

//router.post()

module.exports = router;