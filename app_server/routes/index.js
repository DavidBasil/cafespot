var express = require('express')
var router = express.Router()
var ctrlMain = require('../controllers/main')

// home route
router.get('/', ctrlMain.index)

module.exports = router
