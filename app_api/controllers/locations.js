var mongoose = require('mongoose')
var Location = mongoose.model('Location')

// get all locations
module.exports.locationsList = function(req, res){
	Location.find().exec(function(err, locations){
		if (!locations){
			res.status(200)
			res.json({"message": "there are no locations"})
		} else  if (err){
			res.status(404)
			res.json(err)
		}
		res.status(200)
		res.json(locations)
	})
}

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

// update a location
module.exports.locationsUpdateOne = function(req, res){
	if (!req.params.locationid){
		res.status(404)
		res.json({"message": "not found, locationid is required"})
		return
	}
	Location.findById(req.params.locationid).select('-reviews -rating').exec(function(err, location){
		if (!location){
			res.status(404)
			res.json({"message": "locationid not found"})
			return
		} else if (err){
			res.status(4000)
			res.json(err)
			return
		}
		location.name = req.body.name
		location.address = req.body.address
		// location.facilities = req.body.facilities.split(',')
		// location.openingTimes = [{
		// 	days: req.body.days1,
		// 	opening: req.body.opening1,
		// 	closing: req.body.closing1,
		// 	closed: req.body.closed1
		// }, {
		// 	days: req.body.days2,
		// 	opening: req.body.opening2,
		// 	closing: req.body.closing2,
		// 	closed: req.body.closed2
		// }]
		location.save(function(err, location){
			if (err){
				res.status(404)
				res.json(err)
			} else {
				res.status(200)
				res.json(location)
			}
		})
	})
}

// delete a location
module.exports.locationsDeleteOne = function(req, res){
	var locationid = req.params.locationid
	if (locationid){
		Location.findByIdAndRemove(locationid).exec(function(err, location){
			if (err){
				res.status(404)
				res.json(err)
				return
			}
			res.status(204)
			res.json(null)
		})
	} else {
		res.status(404)
		res.json({"message": "no locationid"})
	}
}
