window.onload = function() {
			//capturing scroll events to prevent changing slide when animation is on
			var scrollEnabled = true,

			pContainer = document.getElementById('pc'),
			pWrapper = document.getElementById('pw'),
			sections = document.querySelectorAll('#pw > .slide-wrap'),
			//width/height of the single section (these sections are not visible but have 
			// z-index greater than actual slides becuase they handle the scoll event on mobile phones)
			height = sections[0].offsetHeight,
			width = sections[0].offsetWidth,
			//keep tracking of at whic section we currenlty are
			currentSlide = 0;

			//event listener on the Proximity Container
			pContainer.onscroll = function() {

				//if scroll is enables try to detect slide change event 
				// else stay on the same scrollTop as the currentSlide is
				(scrollEnabled) ? onScrollEnabled(this) : onScrollDisabled(this);
			}

			function onScrollEnabled(object) {
				const top = object.scrollTop;
				const sectionOffset = currentSlide * height;

				//compare both to get direction of scroll
				const isUp = top > sectionOffset;

				//if absolute difference is greater than 100 change the slide
				if(Math.abs(top - sectionOffset) > 100) {
					//disable scrolling to prevent the scroll when slide is animating
					scrollEnabled = false;
					//animate according to direction
					if(isUp) {
						(currentSlide < sections.length-1) ? currentSlide++ : currentSlide;
					} else {
						(currentSlide > 0) ? currentSlide-- : currentSlide;
					}
					animate(currentSlide);
				}
			}
			//scroll is disabled
			function onScrollDisabled(object) {
			   object.scrollTop = currentSlide * height;
			}

			//animaion function
			// give class "visible" to current slide
			// remove class "visible" from every other slide
			// setTimout for 800ms and enable scrolling events
			function animate(curr) {
				for (var i = sections.length - 1; i >= 0; i--) {
						(i==curr) ? 
						document.getElementById('c-'+i).classList.add("visible") : 
						document.getElementById('c-'+i).classList.remove("visible");
				}
				setTimeout(
					function() { 
						scrollEnabled = true;
						console.log("Free");
				}, 800);
			}
		}