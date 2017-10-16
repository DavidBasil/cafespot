var mongoose = require('mongoose')
var Location = mongoose.model('Location')

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
