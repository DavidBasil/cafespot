var mongoose = require('mongoose')
var crypto = require('crypto')
var jwt = require('jsonwebtoken')

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String
})

// methods
userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toSring('hex')
	this.hash = crypto.pbkdf2sync(password, this.salt, 1000, 64).toString('hex')
}

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2sync(password, this.salt, 1000, 64).toString('hex')
	return this.hash === hash
}

// JWT
userSchema.methods.generateJwt = function(){
	var expiry = new Date()
	expiry.setDate(expiry.getDate() + 7)
	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: pareseInt(expiry.getTime() / 1000),
	}, 'thisIsSecret')
}
