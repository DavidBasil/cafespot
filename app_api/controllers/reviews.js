var mongoose = require('mongoose')
var Location = mongoose.model('Location')

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
