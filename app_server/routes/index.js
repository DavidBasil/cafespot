var express = require('express')
var router = express.Router()
var ctrlLocations = require('../controllers/locations')
var ctrlOthers = require('../controllers/others')

// locations routes
router.get('/', ctrlOthers.angularApp)
// router.get('/location/:locationid', ctrlLocations.locationInfo)
// router.get('/location/:locationid/reviews/new', ctrlLocations.addReview)
// router.post('/location/:locationid/reviews/new', ctrlLocations.doAddReview)

module.exports = router
