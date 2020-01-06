(function() {
	// -------------------- Init catalog ---------------------

	// Retrieve page with a given zIndex
	function getPage(pages, zIndex) {
		return pages.filter(page => {
			return Number(page.style.zIndex) === zIndex;
		})[0];
	}

	// Let iframe GET its content
	function loadFrame(pages, z) {
		const page = getPage(pages, z);
		const frame = page.querySelector("iframe");
		if (frame.src != frame.dataset.src) {
			frame.src = frame.dataset.src;
		}
	}

	// load content in top page and adjacent ones
	function loadFirstFrames(pages) {
		loadFrame(pages, pages.length);
		if (pages.length === 1) return;
		loadFrame(pages, pages.length - 1);
		loadFrame(pages, 1);
	}

	// Update headline text with project/catalog name
	function updateHeadline(whichHeadline, source) {
		let headline = document.querySelector(`.headline-${whichHeadline}-name`);
		headline.innerText =
			whichHeadline == "project" ? source.dataset.projectName : source;
		updateHeaderColumWidth(); // Update to match new text
	}

	// prep new catalog for scroll
	window.initPageScroll = function(pages, catalog) {
		loadFirstFrames(pages);
		updateHeadline("catalog", catalog[0]);
		updateHeadline("project", pages[0]);

		//// if layout !== 0
		// const desc = document.querySelector(".page:not(.disabled) .description");
		// toggleDescription(desc, true);
	};

	// --------------------- Scroll page ----------------------

	// Increment zIndex of all pages and loop at both ends of stack
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
			// Reset recently closed page
			const panel = e.target.querySelector(".panel");
			const desc = e.target.querySelector(".description");
			e.target.classList.add("disabled");
			e.target.classList.remove("closing");
			panel.classList.remove("on-top");
			panel.classList.remove("visible");
			toggleDescription(desc, false);

			shiftPages(pages, increment);

			// Load iframe content in upcoming page
			if (increment) loadFrame(pages, pages.length - 1);
			else loadFrame(pages, 1);

			scrollPage.ready = true;
		}
	}

	function scrollPage(pages, increment) {
		if (pages.length === 1) return;

		// Communicate with handlePageTransitionEnd()
		scrollPage.ready = false;
		scrollPage.increment = increment;

		// Enable next page
		const nextPageZIndex = increment ? pages.length - 1 : 1;
		const nextPage = getPage(pages, nextPageZIndex);
		nextPage.classList.remove("disabled");
		updateHeadline("project", nextPage);

		// Close current page
		const currentPage = getPage(pages, pages.length);
		currentPage.classList.add("closing");
		// -> Continued in handlePageTransitionEnd()
	}

	// Debounce scroll
	scrollPage.ready = true;

	// -------------------- Set up scroll ---------------------

	const SWIPE_SENSITIVITY = 15;
	const SCROLL_SENSITIVITY = 80;

	let touchstartY = 0;

	function handleTouchStart(e) {
		touchstartY = e.touches[0].pageY;
	}

	function handleTouchEnd(e, pages) {
		// Determine touch start and end elements
		const touchEndElement = document.elementFromPoint(
			e.changedTouches[0].clientX,
			e.changedTouches[0].clientY
		);
		const container = document.getElementById("main-content");
		const startedOnContainer = !!e.target.closest("#" + container.id);
		const endedOnContainer = !!touchEndElement.closest("#" + container.id);

		// Swiped from header down
		if (!startedOnContainer && endedOnContainer) {
			togglePanel(true);
		}
		// Swiped from container to header
		else if (startedOnContainer && !endedOnContainer) {
			togglePanel(false);
		}
		// Swiped within container
		else if (startedOnContainer && endedOnContainer) {
			const touchendY = e.changedTouches[0].pageY;
			const deltaY = touchendY - touchstartY;
			if (deltaY < -SWIPE_SENSITIVITY) scrollPage(pages, 1);
			else if (deltaY > SWIPE_SENSITIVITY) scrollPage(pages, 0);
		}
	}

	function handleWheel(e, pages) {
		// Check if mouse is over container
		const container = document.getElementById("main-content");
		if (!!e.target.closest("#" + container.id)) {
			// Avoid trackpad scroll inertia
			if (e.deltaY > SCROLL_SENSITIVITY) scrollPage(pages, 1);
			else if (e.deltaY < -SCROLL_SENSITIVITY) scrollPage(pages, 0);
		}
	}

	// Handle message from iframe
	function handleeMessage(e, pages) {
		if (e.data === "down") scrollPage(pages, 1);
		else if (e.data === "up") scrollPage(pages, 0);
	}

	// Add scroll-related event listeners
	window.setUpPageScroll = function(pages) {
		document.addEventListener("touchstart", handleTouchStart);
		document.addEventListener("touchend", e => handleTouchEnd(e, pages));
		document.addEventListener("wheel", e => handleWheel(e, pages));
		window.addEventListener("message", e => handleeMessage(e, pages));
		document.addEventListener("transitionend", e =>
			handlePageTransitionEnd(e, pages, scrollPage.increment)
		);
	};
})();
