var express = require('express')
var router = express.Router()
var ctrlLocations = require('../controllers/locations')

// locations routes
router.get('/', ctrlLocations.locationsList)
router.get('/location', ctrlLocations.location)
router.get('/location/review/new', ctrlLocations.addReview)

module.exports = router
