var passport = require('passport')
var mongoose = require('mongoose')
var User = mongoose.model('User')

// register
module.exports.register = function(req, res){
	if (!req.body.name || !req.body.email || !req.body.password){
		res.status(400)
		res.json({"message": "All fields required"})
		return
	}
	var user  = new User()
	user.name = req.body.name
	user.email = req.body.email
	user.setPassword(req.body.password)
	user.save(function(err){
		var token
		if (err){
			res.status(404)
			res.json(err)
		} else {
			token = user.generateJwt()
			res.status(200)
			res.json({"token": token})
		}
	})
}

// login
module.exports.login = function(req, res){
	if (!req.body.email || !req.body.password){
		res.status(400)
		res.json({"message": "All fields required"})
		return
	}
	passport.authenticate('local', function(err, user, info){
		var token
		if (err){
			res.status(404)
			res.json(err)
			return
		}
		if (user){
			token = user.generateJwt()
			res.status(200)
			res.json({"token": token})
		} else {
			res.status(401)
			res.json(info)
		}
	})(req, res)
}

