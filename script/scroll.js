//(function() {
function loadUpcomingFrames(pages, fromIndex) {
	for (i = fromIndex; i <= fromIndex + 2; i++) {
		const page = pages[i];
		if (!page) return;

		const frame = page.querySelector("iframe");
		if (frame.src != frame.dataset.src) {
			frame.src = frame.dataset.src;
		}
	}
}

function getPage(pages, zIndex) {
	return pages.filter(page => {
		return Number(page.style.zIndex) === zIndex;
	})[0];
}

function scroll(pages, layoutSelect, increment) {
	scroll.ready = false;
	scroll.increment = increment;

	// close current page
	const currentPage = getPage(pages, pages.length);
	currentPage.classList.add("closing");
	// -> continued in handlePageTransitionEnd()

	// display next/prev page
	const nextPageZIndex = increment > 0 ? pages.length - 1 : 1;
	const nextPage = getPage(pages, nextPageZIndex);
	nextPage.classList.remove("closed");

	// load upcoming frames
	const nextIndex = pages.indexOf(nextPage);
	loadUpcomingFrames(pages, nextIndex);
}

function handlePageTransitionEnd(e, pages, increment) {
	if (e.propertyName === "opacity" && e.target.classList.contains("closing")) {
		console.log(e.target);
		// reset recently closed page
		e.target.classList.remove("closing");
		e.target.classList.add("closed");

		// shift all pages in Z axis
		pages.forEach(page => {
			let index = Number(page.style.zIndex);
			index = index + increment;

			// loop pages at both ends of stack
			if (index > pages.length) index = 1;
			if (index <= 0) index = pages.length;

			page.style.zIndex = index;
		});

		// TODO: focus on new page

		scroll.ready = true;
	}
}

// Handle message from iframe
function receiveMessage(e, pages, layoutSelect) {
	const increment = e.data === "next" ? 1 : e.data === "prev" ? -1 : 0;
	scroll(pages, layoutSelect, increment);
}

function handleWheel(e, pages, layoutSelect) {
	const increment = e.deltaY > 0 ? 1 : -1;
	scroll(pages, layoutSelect, increment);
}

// aux vars for communication between scroll() and handlePageTransitionEnd()
scroll.ready = true;
scroll.increment = 0;

window.setUpScroll = function(pages, layoutSelect) {
	// load first few iframes
	loadUpcomingFrames(pages, 0);

	// prevent re-adding scroll listeners by loadCatalog
	if (setUpScroll.isDone) return;
	setUpScroll.isDone = true;

	document.addEventListener("transitionend", e =>
		handlePageTransitionEnd(e, pages, scroll.increment)
	);

	// add scroll listeners
	window.onmessage = e => {
		receiveMessage(e, pages, layoutSelect);
	};
	// TODO: debounce
	document.addEventListener("wheel", e => handleWheel(e, pages, layoutSelect));
	document.addEventListener("touchstart", () => console.log(`touchstart`));
	document.addEventListener("touchend", () => console.log(`touchend`));
	document.addEventListener("touchmove", () => console.log(`touchmove`));

	scrollIsSetUp = true;
};
//})();
