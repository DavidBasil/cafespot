var mongoose = require('mongoose')
var Location = mongoose.model('Location')

// get a single location
module.exports.locationsReadOne = function(req, res){
	if (req.params && req.params.locationid){
		Location.findById(req.params.locationid).exec(function(err, location){
			if (!location){
				res.status(404)
				res.json({"message": "location not found"})
				return
			} else if (err){
				res.status(404)
				res.json(err)
				return
			}
			res.status(200)
			res.json(location)
		})
	} else {
		res.status(404)
		res.json({"message": "no locationid in request"})
	}
}

// create a location
module.exports.locationsCreateOne = function(req, res){
	Location.create({
		title: req.body.title,
		address: req.body.address,
		facilities: req.body.facilities.split(","),
		openingTimes: [{
			days: req.body.days1,
			opening: req.body.opening1,
			closing: req.body.closing1,
			closed: req.body.closed1
		}, {
			days: req.body.days2,
			opening: req.body.opening2,
			closing: req.body.closing2,
			closed: req.body.closed2
		}]
	}, function(err, location){
		if (err){
			res.status(400)
			res.json(err)
		} else {
			res.status(201)
			res.json(location)
		}
	})
}
