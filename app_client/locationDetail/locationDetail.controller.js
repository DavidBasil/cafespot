;(function(){

	angular
		.module('cafespot')
		.controller('locationDetailCtrl', locationDetailCtrl)

	locationDetailCtrl.$inject = ['$routeParams', 'cafespotData']
	function locationDetailCtrl($routeParams, cafespotData){
		var vm = this
		vm.locationid = $routeParams.locationid
		cafespotData.locationById(vm.locationid).then(function(response){
			vm.data = { location: response.data}
			vm.pageHeader = {
				title: vm.data.location.title
			}
		})
	}

})()
