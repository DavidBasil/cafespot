;(function(){

	angular
		.module('cafespot')
		.directive('pageHeader', pageHeader)

	function pageHeader(){
		return {
			restrict: 'EA',
			scope: {
				content: '=content'
			},
			templateUrl: '/common/directives/pageHeader/pageHeader.template.html'
		}
	}

})()
