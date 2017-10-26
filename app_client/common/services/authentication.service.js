;(function(){

	angular
		.module('cafespot')
		.service('authentication', authentication)

	authentication.$inject = ['$window']
	function authentication($window){
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
		return {
			saveToken: saveToken,
			getToken: getToken
		}
	}

})()
