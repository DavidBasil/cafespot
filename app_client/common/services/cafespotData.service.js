;(function(){

	angular
		.module('cafespot')
		.service('cafespotData', cafespotData)

	cafespotData.$inject = ['$http']

	function cafespotData($http){
		var getLocationList = function(){
			return $http.get('/api/locations')
		}
		var locationById = function(locationid){
			return $http.get('/api/locations/' + locationid)
		}
		return {
			getLocationList: getLocationList,
			locationById: locationById
		}
	}

})()

