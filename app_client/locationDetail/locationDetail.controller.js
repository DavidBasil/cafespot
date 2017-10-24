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
		vm.formData = {}
		vm.onSubmit = function(){
			//console.log(vm.formData)
			console.log(vm.formData)
			cafespotData.addReviewById(vm.data.location._id, vm.formData)
				.then(function(response){
					console.log('added successfully!')
				}, function(err){
					console.log(err)
				})
		}
		// vm.popupReviewForm = function(){
		// 	alert('Let\'s add review!')
		// }
	}

})()
