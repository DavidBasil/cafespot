var mongoose = require('mongoose')
var Location = mongoose.model('Location')

module.exports.locationsReadOne = function(req, res){
	res.status(200)
	res.json({"status": "success"})
}
