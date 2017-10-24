var mongoose = require('mongoose')
var gracefulShutdown
var dbURI = 'mongodb://localhost/cafespot'
mongoose.connect(dbURI)

// connection events
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI)
})

mongoose.connection.on('error', function(){
	console.log('Mongoose connection error ' + err)
})

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected')
})

// graceful shutdown
gracefulShutdown = function(msg, callback) {
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg)
		callback()
	})	
}

// connection termination
process.once('SIGUSR2', function(){
	gracefulShutdown('nodemon restart', function(){
		process.kill(process.pid, 'SIGUSR2')
	})
})

process.on('SIGINT', function(){
	gracefulShutdown('app termination', function(){
		process.exit(0)
	})
})

require('./locations')
require('./users')
