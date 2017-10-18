var request = require('request')
var apiOptions = {
	server: "http://localhost:3000"
}

// get location info
var getLocationInfo = function(req, res, callback){
	var requestOptions, path
	path = "/api/locations/" + req.params.locationid
	requestOptions = {
		url: apiOptions.server + path,
		method: 'GET',
		json: {}
	}
	request(requestOptions, function(err, response, body){
		if (response.statusCode === 200){
			callback(req, res, body)
		} else {
			_showError(req, res, response.statusCode)
		}
	})
}


// todo: review error functionality
// show errors
var _showError = function(req, res, status){
	var title, content
	if (status === 400){
		title = '404, page not found'			
		content = 'Sorry. We can\'t find the page you\'re looking for.'
	} else {
		title = status + ', something went wrong'
		content = 'Somethig, somewhere, has gone just a little bit wrong.'
	}
	res.status(status)
	res.render('error-text', {
		title: title,
		content: content
	})
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
		json: {}
	}
	request(requestOptions, function(err, response, body){
		renderHomepage(req, res, body)
	})
}

// single location rendering
var renderDetailPage = function(req, res, location){
	res.render('location-info', {
		title: location.title,
		location: location
	})
}
// single location controller
module.exports.locationInfo = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderDetailPage(req, res, responseData)
	})
}

// review form rendering
var renderReviewForm = function(req, res, location){
	res.render('location-review-form', {
		title: 'Review ' + location.title + ' on Cafespot',
		pageHeader: {title: 'Review ' + location.title},
		error: req.query.err
	})
}

// get add review page
module.exports.addReview = function(req, res){
	getLocationInfo(req, res, function(req, res, responseData){
		renderReviewForm(req, res, responseData)
	})
}

// do add review page
module.exports.doAddReview = function(req, res){
	var requestOptions, path, locationid, postdata
	locationid = req.params.locationid
	path = '/api/locations/' + locationid + '/reviews/'
	postdata = {
		author: req.body.author,
		rating: parseInt(req.body.rating, 10),
		reviewText: req.body.reviewText
	}
	requestOptions = {
		url: apiOptions.server + path,
		method: 'POST',
		json: postdata
	}
	if (!postdata.author || !postdata.rating || !postdata.reviewText){
		res.redirect('/location/' + locationid + '/reviews/new?err=val')
	} else {
		request(requestOptions, function(err, response, body){
			if (response.statusCode === 201){
				res.redirect('/location/' + locationid)
			} else  if (response.statusCode === 400 && body.name && body.name === 'ValidationError'){
				res.redirect('/location/' + locationid + '/reviews/new?err=val')
			} else {
				_showError(req, res, response.statusCode)
			}
		})
	}
}
