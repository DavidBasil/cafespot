angular
	.module('cafespot')
	.service('cafespotData', cafespotData)

function cafespotData($http){
		return $http.get('/api/locations')
}
