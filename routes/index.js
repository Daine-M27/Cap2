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

// GET admin dashboard page
router.get('/admindash', function(req, res, next){
    res.render('admindashboard', {title: 'Administration Dashboard'});
});

module.exports = router;
