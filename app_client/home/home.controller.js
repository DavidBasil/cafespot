angular
	.module('cafespot')
	.controller('homeCtrl', homeCtrl)

function homeCtrl($scope){
	$scope.pageHeader = {
		title: 'Cafespot',
		strapline: 'Review your favorite cafes'
	}
}
