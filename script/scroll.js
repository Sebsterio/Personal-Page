// load all iframes
// loadIFrames = function(container) {
// 	const iframes = container.querySelectorAll("iframe");
// 	iframes.forEach(iframe => {
// 		iframe.src = iframe.dataset.src;
// 	});
// };

function loadUpcomingIframes(tiles, nextIndex, cols, rows) {
	// select all tiles 1 viewport ahead of newly activated tile
	for (i = nextIndex; i <= nextIndex + 1 + cols * rows; i++) {
		const tile = tiles[i];
		if (!tile) return;
		const frame = tile.querySelector("iframe");
		if (frame.src != frame.dataset.src) {
			frame.src = frame.dataset.src;
		}
	}
}

function scrollPage(container, tiles, { cols, rows }, direction) {
	// get Tile currently in focus
	const activeTile = container.querySelector(".active");
	const index = tiles.indexOf(activeTile);

	// determine which tile to scroll to
	let nextIndex;
	let nextTile;
	switch (direction) {
		case "start":
			nextIndex = 0;
			break;
		case "next":
			// get same tile position on next page (1 full page scroll)
			nextIndex = index + cols * rows;
			if (nextIndex > tiles.length - 1) nextIndex = tiles.length - 1;

			break;
		case "prev":
			// get same tile position on prev page (1 full page scroll)
			nextIndex = index - cols * rows;
			if (nextIndex < 0) nextIndex = 0;
			break;
		// first/last in array
		default:
			new Error("unknown scroll direction parameter");
	}
	nextTile = tiles[nextIndex];

	// deactivate all tiles in case of multi col touch event (i.e. no mouseleave event)
	tiles.forEach(tile => {
		tile.classList.remove("active");
		tile.classList.remove("visible");
	});

	// activate new tile
	nextTile.classList.add("active");
	nextTile.classList.add("visible");

	// scroll
	container.style.top = nextTile.offsetTop * -1;

	// load iframes one page below
	loadUpcomingIframes(tiles, nextIndex, cols, rows);
}

// message from iframe: swipe-up[-edge] | swipe-down[-edge] | touch
function receiveMessage(e, container, tiles, layout) {
	const direction =
		e.data === "swipe-up-edge" || e.data === "scroll-down-edge"
			? "next"
			: e.data === "swipe-down-edge" || e.data === "scroll-up-edge"
			? "prev"
			: "";
	if (direction) scrollPage(container, tiles, layout, direction);
}

function setUpScroll(tiles, layout, container, fullScreen) {
	// listen for swipe events from iframe
	window.addEventListener("message", e => {
		receiveMessage(e, container, tiles, layout);
	});

	// TEMP
	//loadIFrames(container);
	// init tiles and iframes
	if (fullScreen) {
		// activate first tile, which loads upcoming iframes
		scrollPage(container, tiles, layout, "start");
	} else {
		// load iframes visible on page
		loadUpcomingIframes(tiles, 0, layout.cols, layout.rows);
	}

	// TODO
	// listen for swipe events from .overlay
	// document.addEventListener("touchstart", handleTouchStart);
	// document.addEventListener("touchend", handleTouchEnd);

	// listend to wheel & trackpad events from overlay
}
//
//
