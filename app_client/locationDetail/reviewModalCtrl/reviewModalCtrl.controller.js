;(function(){

	angular
		.module('cafespot')
		.controller('reviewModalCtrl', reviewModalCtrl)

	reviewModalCtrl.$inject = ['$scope']
	function reviewModalCtrl($scope){
		var vm = this
	 	vm.data = {}
		// vm.onSubmit = function(){
		// 	console.log(vm.data)
		// 	return false
		// }
	}	

})()
