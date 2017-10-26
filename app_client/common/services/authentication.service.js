;(function(){

	angular
		.module('cafespot')
		.service('authentication', authentication)

	authentication.$inject = ['$http','$window']
	function authentication($http, $window){
		var saveToken = function(token){
			$window.localStorage['cafespot-token'] = token
		}
		var getToken = function(){
			return $window.localStorage['cafespot-token']
		}
		var isLoggedIn = function(){
			var token = getToken()
			if (token){
				var payload = JSON.parse($window.atob(token.split('.')[i]))
				return payload.exp > Date.now() / 1000
			} else {
				return false
			}
		}
		var currentUser = function(){
			if (isLoggedIn()){
				var token = getToken()
				var payload = JSON.parse($window.atob(token.split('.')[i]))
				return {
					email: payload.email,
					name: payload.name
				}
			}
		}
		var register = function(user){
			return $http.post('/api/register', user).then(function(data){
				saveToken(data.token)
			})
		}
		var login = function(user){
			return $http.post('/api/login', user).then(function(data){
				saveToken(data.token)
			})
		}
		var logout = function(){
			$window.localStorage.removeItem('cafespot-token')
		}
		return {
			saveToken: saveToken,
			getToken: getToken,
			currentUser: currentUser,
			isLoggedIn: isLoggedIn,
			register: register,
			login: login,
			logout: logout
		}
	}

})()
