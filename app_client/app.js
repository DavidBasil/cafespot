'use strict'

angular.module('cafespot', ['ngRoute'])

function config($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({ redirectTo: '/' })
}

angular
	.module('cafespot')
	.config(['$routeProvider', config])
