var express = require('express');
var router = express.Router();

var homepageController = function(req, res){
	res.render('index', { title: 'David' })
}

/* GET home page. */
router.get('/', homepageController)

module.exports = router;
