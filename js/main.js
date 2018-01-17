document.onreadystatechange = function () {
	var count;

	/*
	* Main counting function
	*/
	function count() {
		count = setInterval(function () {
			var min = document.querySelector('#min');
			var sec = document.querySelector('#sec');

			var minVal = min.innerHTML, secVal = sec.innerHTML;
			if ( minVal != 0 || secVal != 0) {
				if ( secVal == 0) {
					secVal = 59;
					minVal--;
					if (minVal < 10) {
						minVal = '0' + minVal;
					}
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
		stopMsg.classList.add('stopped');
		clearInterval(count);
		fadeIn(stopMsg.parentNode);
	}

	/*
	*	Fading script for stop message
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
		var stopMsg = document.querySelector('#stop p');
		var stopBtn = document.querySelector('.stop-btn');

		if ( !stopMsg.classList.contains('stopped') ) {
			count();
		}

		stopBtn.addEventListener('click', function() {
			stop();
		});
	}
};
