'use strict'

;(function(){

	angular.module('cafespot', ['ngRoute', 'ngSanitize'])

	function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'home/home.view.html',
				controller: 'homeCtrl',
				controllerAs: 'vm'
			})
			.when('/about', {
				templateUrl: '/common/views/genericText.view.html',
				controller: 'aboutCtrl',
				controllerAs: 'vm'
			})
			.when('/location/:locationid', {
				templateUrl: 'locationDetail/locationDetail.view.html',
				controller: 'locationDetailCtrl',
				controllerAs: 'vm'
			})
			.when('/register', {
				templateUrl: '/auth/register/register.view.html',
				controller: 'registerCtrl',
				controllerAs: 'vm'
			})
			.otherwise({ redirectTo: '/' })
		$locationProvider.html5Mode(true)
	}

	angular
		.module('cafespot')
		.config(['$routeProvider', '$locationProvider', config])

})()
