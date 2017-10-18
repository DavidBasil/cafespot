$('#addReview').submit(function(e){
	$('.uk-alert').hide()
	if (!$('input#author').val() || !$('input#rating').val() || !$('textarea#reviewText').val()){
		if ($('.uk-alert').length){
			$('.uk-alert').show()
		} else {
			$(this).prepend('<div class="uk-alert uk-alert-danger">All fields are required, please try again</div>')
		}
		return false
	}
})
