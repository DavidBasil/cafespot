var ratingStars = function(){
	return {
		scope: {
			thisRating: '=rating'
		},
		templateUrl: '/angular/rating-stars.html'
	}
}

angular
	.module('cafespot', [])
	.controller('locationListCtrl', locationListCtrl)
	.directive('ratingStars', ratingStars)
	.service('cafespotData', cafespotData)

