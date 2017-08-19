$(document).ready(function() {
	var min = $('#min').text(), sec = $('#sec').text();

	function count() {
		var count = setInterval(function () {
			if ( min != 0 || sec != 0) {
				if ( sec == 0) {
					sec = 59;
					min--;
					if (min < 10) {
						min = '0'+min;
					}
					$('#min').html(min);
					$('#sec').html(sec);
				} else {
					sec--;
					if (sec < 10) {
						sec = '0'+sec;
					}
					$('#sec').html(sec);
				}
			} else {
				$('#stop p').append('Time over!').addClass('stopped')
				$('#stop').animate({
					'opacity' : 1,
				}, 1000);
				clearInterval(count);
			}
		}, 1000);
	}
	
	if ( !$('#stop p').hasClass('stopped') ) {
		count();
	}
	
	/* function clearError() {
		if ( $('.error').hasClass('error-on') ) {
			setInterval(function() {
				$('.error').empty();
				$('.error').removeClass('error-on');
			}, 4000);
		}
	}

	$("#btn").on('click', function() {
		var minInput = $('#min-input').val(), secInput = $('#sec-input').val();
		
		if ( minInput <= 0 || secInput <= 0 || minInput > 60 || secInput > 60 ) {
			$('.error').append('Enter valid timer values').addClass('error-on');
			clearError();
		} else {
			MinArray[0] = minInput;
			SecArray[0] = secInput;
			
			if ( $('#result').hasClass('default') ) {
				$('#result').removeClass('deafult');
			}
		}
	}); */
	
});