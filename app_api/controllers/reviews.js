var mongoose = require('mongoose')
var Location = mongoose.model('Location')

// get a single review
module.exports.reviewsReadOne = function(req, res){
	if (req.params && req.params.locationid && req.params.reviewid){
		Location.findById(req.params.locationid).select('title reviews').exec(function(err, location){
			var response, review
			if (!location){
				res.status(404)
				res.json({"message": "locationid not found"})
				return
			} else if (err){
				res.status(400)
				res.json(err)
				return
			}
			if (location.reviews && location.reviews.length > 0){
				review = location.reviews.id(req.params.reviewid)
				// if stuck: it should be _id during update
				if (!review){
					res.status(404)
					res.json({"message": "reviewid not found"})
				} else {
					response = {
						location: {
							name: location.name,
							id: req.params.locationid
						},
						review: review
					}
					res.status(200)
					res.json(response)
				}
			} else {
				res.status(404)
				res.json({"message": "no reviews found"})
			}
		})
	} else {
		res.status(404)
		res.json({"message": "not found, locationid and reviewid are both required"})
	}
}

// create a review
module.exports.reviewsCreateOne = function(req, res){
	var locationid = req.params.locationid
	if (locationid){
		Location.findById(locationid).select('reviews').exec(function(err, location){
			if (err){
				res.status(400)
				res.json(err)
			} else {
				doAddReview(req, res, location)
			}
		})
	}
}
// todo: review
// doAddReview
var doAddReview = function(req, res, location){
	if (!location){
		res.status(404)
		res.json({"message": "locationid not found"})
	} else {
		location.reviews.push({
			author: req.body.author,
			rating: req.body.rating,
			reviewText: req.body.reviewText
		})
		location.save(function(err, location){
			var thisReview
			if (err){
				res.status(400)
				res.json(err)
			} else {
				updateAverageRating(location._id)
				thisReview = location.reviews[location.reviews.length - 1]
				res.status(201)
				res.json(thisReview)
			}
		})
	}
}
// todo: review
// updateAverageRating
var updateAverageRating = function(locationid){
	Location.findById(locationid).select('rating reviews').exec(function(err, location){
		if (!err){
			doSetAverageRating(location)
		}
	})
}
// todo: review
// doSetAverageRating
var doSetAverageRating = function(location){
	var i, reviewCount, ratingAverage, ratingTotal
	if (location.reviews && location.reviews.length > 0){
		reviewCount = location.reviews.length
		ratingTotal = 0
		for (i = 0; i < reviewCount; i++){
			ratingTotal = ratingTotal + location.reviews[i].rating
		}
		ratingAverage = parseInt(ratingTotal / reviewCount, 10)
		location.rating = ratingAverage
		location.save(function(err){
			if (err){
				console.log(err)
			} else {
				console.log("Average rating updated to " + ratingAverage)
			}
		})
	}
}
