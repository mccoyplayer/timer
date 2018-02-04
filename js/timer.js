/**
 * countdown-timer - Countdown Timer build with CSS, JS and HTML
 * @version v1.0.1
 * @license MIT
 * @link https://github.com/raajnadar/countdown-timer
 */

document.onreadystatechange = function () {
	/*
	*	Initialized necessary variables before page load
	*/
	var count, day, hour, min, sec, dayTag, hourTag, minTag, secTag;
	var dayVal, hourVal, minVal, secVal;

	/*
	*	Main counting function
	*/
	function count() {
		count = setInterval(function () {
			day = document.querySelector('#ct--day');
			hour = document.querySelector('#ct--hour');
			min = document.querySelector('#ct--min');
			sec = document.querySelector('#ct--sec');

			dayTag = document.querySelector('.ct--day');
			hourTag = document.querySelector('.ct--hour');
			minTag = document.querySelector('.ct--min');
			secTag = document.querySelector('.ct--sec');

			if ( stopMsg.classList.contains('ct--paused') ) {
				return false;
			}

			/*
			*	Values to count
			*/
			dayVal = day.innerHTML;
			hourVal = hour.innerHTML;
			minVal = min.innerHTML;
			secVal = sec.innerHTML;

			if (  dayVal != 0 || hourVal != 0 || minVal != 0 || secVal != 0) {
				if ( secVal == 0) {
					secVal = 59;
					if ( minVal > 0 ) {
						minVal--;
					} else {
						minVal = 59;
						if (hourVal > 0) {
							hourVal--;
							if (hourVal < 10) {
								hourVal = '0' + hourVal;
							}
						} else {
							hourVal = 23;
							dayVal--;
							if (dayVal < 10) {
								dayVal = '0' + dayVal;
							}
						}
					}
					if (minVal < 10) {
						minVal = '0' + minVal;
					}
					day.innerHTML = dayVal;
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
	*	Auto stop and User stopping functionality
	*/
	function stop() {
		stopMsg.innerHTML = 'Time over!';
		stopMsg.classList.add('ct--stopped');
		day.innerHTML = hour.innerHTML = min.innerHTML = sec.innerHTML = "00";
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
		*	Initialized necessary variables after page load
		*/
		var stopMsg = document.querySelector('#ct--stop p');
		var stopBtn = document.querySelector('.ct--stop-btn');
		var pauseBtn = document.querySelector('.ct--pause-btn');
		var startBtn = document.querySelector('.ct--start-btn');

		/*
		*	Count until a stop class is added to the element
		*/
		if ( !stopMsg.classList.contains('ct--stopped') ) {
			count();
		}

		/*
		*	Start/Stop/Pause functionality
		*/
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
