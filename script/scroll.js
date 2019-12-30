(function() {
	// ------------------- transitionend ---------------------

	// let iframe GET its content
	function loadFrame(pages, z) {
		const page = getPage(pages, z);
		const frame = page.querySelector("iframe");
		if (frame.src != frame.dataset.src) {
			frame.src = frame.dataset.src;
		}
	}

	// increment zIndex of all pages and loop at both ends of stack
	function shiftPages(pages, increment) {
		pages.forEach(page => {
			let index = Number(page.style.zIndex);
			index = index + (increment ? 1 : -1);
			if (index > pages.length) index = 1;
			if (index <= 0) index = pages.length;
			page.style.zIndex = index;
		});
	}

	function handlePageTransitionEnd(e, pages, increment) {
		if (
			e.propertyName === "opacity" &&
			e.target.classList.contains("closing")
		) {
			// reset recently closed page
			e.target.classList.add("disabled");
			e.target.classList.remove("closing");
			const panel = e.target.querySelector(".panel");
			panel.classList.remove("on-top");
			panel.classList.remove("visible");
			panel.classList.remove("hover");
			panel.classList.remove("expanded");

			shiftPages(pages, increment);

			// load iframe content in upcoming page
			if (increment) loadFrame(pages, pages.length - 1);
			else loadFrame(pages, 1);

			scroll.ready = true;
		}
	}

	// ----------------------- scroll -------------------------

	// retrieve page with a given zIndex
	function getPage(pages, zIndex) {
		return pages.filter(page => {
			return Number(page.style.zIndex) === zIndex;
		})[0];
	}

	function scroll(pages, increment) {
		// communicate with handlePageTransitionEnd()
		scroll.ready = false;
		scroll.increment = increment;

		// enable next/prev page
		const nextPageZIndex = increment ? pages.length - 1 : 1;
		const nextPage = getPage(pages, nextPageZIndex);
		nextPage.classList.remove("disabled");

		// close current page
		const currentPage = getPage(pages, pages.length);
		currentPage.classList.add("closing");
		// -> continued in handlePageTransitionEnd()
	}

	// debounce scroll
	scroll.ready = true;

	// -------------------- set up scroll ---------------------

	const SWIPE_SENSITIVITY = 15;
	const SCROLL_SENSITIVITY = 80;

	let touchstartY = 0;

	function handleTouchStart(e) {
		touchstartY = e.touches[0].pageY;
	}

	function handleTouchEnd(e, pages) {
		const touchendY = e.changedTouches[0].pageY;
		const deltaY = touchendY - touchstartY;
		if (deltaY < -SWIPE_SENSITIVITY) scroll(pages, 1);
		else if (deltaY > SWIPE_SENSITIVITY) scroll(pages, 0);
	}

	function handleWheel(e, pages) {
		// avoid trackpad scroll inertia
		if (e.deltaY > SCROLL_SENSITIVITY) scroll(pages, 1);
		else if (e.deltaY < -SCROLL_SENSITIVITY) scroll(pages, 0);
	}

	// Handle message from iframe
	function handleeMessage(e, pages) {
		if (e.data === "down") scroll(pages, 1);
		else if (e.data === "up") scroll(pages, 0);
	}

	window.setUpScroll = function(pages) {
		// load content in top page and adjacent ones
		loadFrame(pages, pages.length);
		loadFrame(pages, pages.length - 1);
		loadFrame(pages, 1);

		// prevent re-adding scroll listeners by loadCatalog
		if (setUpScroll.isDone) return;
		setUpScroll.isDone = true;

		document.addEventListener("touchstart", handleTouchStart);
		document.addEventListener("touchend", e => handleTouchEnd(e, pages));
		document.addEventListener("wheel", e => handleWheel(e, pages));
		window.addEventListener("message", e => handleeMessage(e, pages));

		document.addEventListener("transitionend", e =>
			handlePageTransitionEnd(e, pages, scroll.increment)
		);
	};
})();
