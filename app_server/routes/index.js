var express = require('express')
var router = express.Router()
var ctrlLocations = require('../controllers/locations')

// locations routes
router.get('/', ctrlLocations.homelist)
router.get('/location/:locationid', ctrlLocations.locationInfo)
router.get('/location/review/new', ctrlLocations.addReview)

module.exports = router
