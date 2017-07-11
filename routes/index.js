const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Indigo Pearl Home' });
});

// GET gallery page
router.get('/gallery', function(req, res, next){
	res.render('gallery', {title: 'Gallery'});
});

// GET gallery page
router.get('/login', function(req, res, next){
    res.render('login', {title: 'Login'});
});

module.exports = router;
