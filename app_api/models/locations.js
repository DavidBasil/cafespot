var mongoose = require('mongoose')

// opening hours schema
var openingTimeSchema = new mongoose.Schema({
	days: {
		type: String,
		required: true
	},
	opening: String,
	closing: String,
	closed: {
		type: Boolean,
		required: true
	}
})

// review schema
var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5
	},
	reviewText: String,
	createdOn: {
		type: Date,
		"default": Date.now
	}
})

// location schema
var locationSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		"default": 1,
		min: 1,
		max: 5,
		required: true
	},
	facilities: [String],
	openingTimes: [openingTimeSchema],
	reviews: [reviewSchema]
})

mongoose.model('Location', locationSchema)
