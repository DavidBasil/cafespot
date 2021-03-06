var express = require('express')
var router = express.Router()
var jwt = require('express-jwt')
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})
var ctrlLocations = require('../controllers/locations')
var ctrlReviews = require('../controllers/reviews')
var ctrlAuth = require('../controllers/authentication')

// LOCATIONS
// get a list of locations
router.get('/locations', ctrlLocations.locationsList)
// get a single location
router.get('/locations/:locationid', ctrlLocations.locationsReadOne)
// // create a new location
router.post('/locations', ctrlLocations.locationsCreateOne)
// update a location
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne)
// delete a location
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne)

// REVIEWS
// get a single review
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne)
// // create a new review
router.post('/locations/:locationid/reviews/', auth, ctrlReviews.reviewsCreateOne)
 // update a review
router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne)
// delete a review
router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne)

// AUTHENTICATION
router.post('/register', ctrlAuth.register)
router.post('/login', ctrlAuth.login)

module.exports = router
