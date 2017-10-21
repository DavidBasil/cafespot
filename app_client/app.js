'use strict'

angular.module('cafespot', ['ngRoute'])

function config($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl'
		})
		.otherwise({ redirectTo: '/' })
}

angular
	.module('cafespot')
	.config(['$routeProvider', config])
