function loadUpcomingIframes(tiles, fromIndex) {
	for (i = fromIndex; i <= fromIndex + 2; i++) {
		const tile = tiles[i];
		if (!tile) return;
		const frame = tile.querySelector("iframe");
		if (frame.src != frame.dataset.src) {
			frame.src = frame.dataset.src;
		}
	}
}

function getNextIndex(index, direction, tilesLength) {
	let nextIndex;
	switch (direction) {
		case "start":
			nextIndex = 0;
			break;
		case "next":
			nextIndex = index + 1;
			if (nextIndex > tilesLength - 1) nextIndex = tilesLength - 1;
			break;
		case "prev":
			nextIndex = index - 1;
			if (nextIndex < 0) nextIndex = 0;
			break;
		default:
			new Error("unknown scroll direction parameter");
	}
	return nextIndex;
}

function scrollPage(container, pages, layoutSelect, direction) {
	// get tile currently in focus
	const activeTile = container.querySelector(".active");
	const index = pages.indexOf(activeTile);

	// determine which tile to scroll to
	const nextIndex = getNextIndex(index, direction, pages.length);
	if (nextIndex === index) return;
	nextTile = pages[nextIndex];

	// scroll
	container.style.top = nextTile.offsetTop * -1;

	// deactivate all pages in case of multi col touch event (i.e. no mouseleave event)
	pages.forEach(tile => {
		tile.classList.remove("active");
		tile.classList.remove("visible");
	});

	// activate new tile
	nextTile.classList.add("active");
	nextTile.classList.add("visible");

	// load iframes 2 pages below
	loadUpcomingIframes(pages, nextIndex);
	// -> pages activation & deactivation in 'transitionend' handler
}

// document.addEventListener("transitionend", e => {
// 	if (e.propertyName === "top") {
// 	}
// });

// handle message from iframe
function receiveMessage(e, container, pages, layoutSelect) {
	scrollPage(container, pages, layoutSelect, e.data);
}

function handleWheel(e, container, pages, layoutSelect) {
	const direction = e.deltaY > 0 ? "next" : "prev";
	scrollPage(container, pages, layoutSelect, direction);
}

//
//
//

function setUpScroll(pages, container, layoutSelect) {
	// prevent adding multiple listeners on window resize
	if (!window.onmessage) {
		// listen for scroll events from iframe
		window.onmessage = e => {
			receiveMessage(e, container, pages, layoutSelect);
		};
	}

	// activate first tile, which loads upcoming iframes
	scrollPage(container, pages, layoutSelect, "start");
	// load iframes visible on page
	// loadUpcomingIframes(pages, 0);

	document.addEventListener("touchstart", () => console.log(`touchstart`));
	document.addEventListener("touchend", () => console.log(`touchend`));
	document.addEventListener("touchmove", () => console.log(`touchmove`));
	// TODO: debounce
	document.addEventListener("wheel", e =>
		handleWheel(e, container, pages, layoutSelect)
	);
}
