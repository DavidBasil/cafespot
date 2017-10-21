angular
	.module('cafespot')
	.controller('homeCtrl', homeCtrl)
// todo: review
function homeCtrl($scope, cafespotData){
	var vm = this
	vm.pageHeader = {
		title: 'Cafespot',
		strapline: 'Review your favorite cafes'
	}
	vm.message = "Loading cafes"
	vm.getData = function(){
		cafespotData.then(function(response){
			vm.message = 'Found ' + response.data.length + ' cafes.'
			vm.data = { locations: response.data }
			console.log(response)
		}, function(e){
			vm.message = 'Sorry, something went wrong'
		})
	}
	vm.getData()
	vm.showError = function(error){
		vm.$apply(function(){
			vm.message = error.message
		})
	}
}
