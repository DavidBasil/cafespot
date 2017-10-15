// home page
module.exports.locationsList = function(req, res){
	res.render('index', { title: 'Home' })
}

// single location
module.exports.location = function(req, res){
	res.render('location', { title: 'Starcups' })
}

// add review page
module.exports.addReview = function(req, res){
	res.render('review', { title: 'Add review' })
}

