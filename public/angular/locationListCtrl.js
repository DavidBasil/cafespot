var cafespotData = function($http){
	return $http.get('/api/locations')
}
// review $http calls
var locationListCtrl = function($scope, cafespotData){
	$scope.message = "Checking your location"
	cafespotData.then(function(response){
		$scope.data = { locations: response.data }
		$scope.message = "Found " + response.data.length + " locations."
	}, function(e){
		$scope.message = 'Error!'
	})
}

