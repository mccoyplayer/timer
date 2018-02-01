/**
 * countdown-timer - Countdown Timer build with CSS, JS and HTML
 * @version v1.0.0
 * @license MIT
 * @link https://github.com/raajnadar/countdown-timer
 */

document.onreadystatechange = function () {
	var count;

	/*
	* Main counting function
	*/
	function count() {
		count = setInterval(function () {
			var day = document.querySelector('#ct--day');
			var hour = document.querySelector('#ct--hour');
			var min = document.querySelector('#ct--min');
			var sec = document.querySelector('#ct--sec');

			if ( stopMsg.classList.contains('ct--paused') ) {
				return false;
			}

			var dayVal = day.innerHTML, hourVal = hour.innerHTML, minVal = min.innerHTML, secVal = sec.innerHTML;
			if ( hourVal != 0 || minVal != 0 || secVal != 0) {
				if ( secVal == 0) {
					secVal = 59;
					if ( minVal > 0 ) {
						minVal--;
					} else {
						minVal = 59;
						hourVal--;
						if (hourVal < 10) {
							hourVal = '0' + hourVal;
						}
					}
					if (minVal < 10) {
						minVal = '0' + minVal;
					}
					hour.innerHTML = hourVal;
					min.innerHTML = minVal;
					sec.innerHTML = secVal;
				} else {
					secVal--;
					if (secVal < 10) {
						secVal = '0' + secVal;
					}
					sec.innerHTML = secVal;
				}
			} else {
				stop();
			}
		}, 1000);
	}

	/*
	*	User stopping functionality
	*/
	function stop() {
		stopMsg.innerHTML = 'Time over!';
		stopMsg.classList.add('ct--stopped');
		clearInterval(count);
		fadeIn(stopMsg.parentNode);
	}

	/*
	*	Animate the stop message
	*/
	function fadeIn(element) {
		element.style.opacity = 0;

		(function fade() {
			var val = parseFloat(element.style.opacity);
			if (!((val += 0.1) > 1)) {
				element.style.opacity = val;
				requestAnimationFrame(fade);
			}
		}());
	}

	if (document.readyState === 'complete') {
		/*
		*	Initialized necessary variables
		*/
		var stopMsg = document.querySelector('#ct--stop p');
		var stopBtn = document.querySelector('.ct--stop-btn');
		var pauseBtn = document.querySelector('.ct--pause-btn');
		var startBtn = document.querySelector('.ct--start-btn');

		if ( !stopMsg.classList.contains('ct--stopped') ) {
			count();
		}

		stopBtn.addEventListener('click', function() {
			if ( !stopMsg.classList.contains('ct--stopped') ) {
				stop();
			}
		});

		pauseBtn.addEventListener('click', function() {
			if ( !stopMsg.classList.contains('ct--paused') && !stopMsg.classList.contains('ct--stopped') ) {
				stopMsg.classList.add('ct--paused');
			}
		});

		startBtn.addEventListener('click', function() {
			if ( stopMsg.classList.contains('ct--paused') ) {
				stopMsg.classList.remove('ct--paused');
			}
		});
	}
};