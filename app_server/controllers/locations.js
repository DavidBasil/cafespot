var request = require('request')
var apiOptions = {
	server: "http://localhost:3000"
}

// home page rendering
var renderHomepage = function(req, res, responseBody){
	var message
	if (!(responseBody instanceof Array)){
		message = "API lookup error"
		responseBody = []
	} else {
		if (!responseBody.length){
			message = "No places found nearby"
		}
	}
	res.render('locations-list', {
		title: 'Cafespot - review your favorite cafe.',
		pageHeader: {
			title: 'Cafespot',
			strapline: 'Review your favorite cafe in your town'
		},
		locations: responseBody,
		message: message
	})
}

// home page controller
module.exports.homelist = function(req, res){
	var requestOptions, path
	path = '/api/locations'
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {},
		qs: {}
	}
	request(requestOptions, function(err, response, body){
		renderHomepage(req, res, body)
	})
}

// single location
module.exports.locationInfo = function(req, res){
	res.render('location-info', { title: 'Starcups' })
}

// add review page
module.exports.addReview = function(req, res){
	res.render('review', { title: 'Add review' })
}

