;(function(){

	angular
		.module('cafespot')
		.service('cafespotData', cafespotData)

	cafespotData.$inject = ['$http']
	function cafespotData($http){
		return $http.get('/api/locations')
	}

})()
