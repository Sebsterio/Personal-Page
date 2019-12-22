// distance between touchStart and touchEnd to be considered a swipe
// const SWIPE_SENSITIVITY = 15;

// let touchstartY = 0;

// function handleTouchStart(e) {
// 	touchstartY = e.touches[0].pageY;
// }
// function handleTouchEnd(e) {
// 	const touchendY = e.changedTouches[0].pageY;
// 	const deltaY = touchendY - touchstartY;
// 	const message =
// 		deltaY > SWIPE_SENSITIVITY
// 			? "swipe-down"
// 			: deltaY < -SWIPE_SENSITIVITY
// 			? "swipe-up"
// 			: "touch";
// 	targetOrigin = "*";
// 	window.parent.postMessage(message, targetOrigin);
// }

// function setUpTouchControls(overlay) {}
//
//
//
//

// ON HEADER CLICK
//toggleOverlays(pages[index], pages[newIndex]);
// function toggleOverlays(prevPage, newPage) {
// 	const currentOverlay = prevPage.querySelector(".overlay");
// 	currentOverlay.style.zIndex = "initial";
// 	currentOverlay.classList.remove("hover");

// 	//remove overlay from current page
// 	setTimeout(() => {
// 		const nextOverlay = newPage.querySelector(".overlay");
// 		nextOverlay.classList.add("hover");
// 	}, 500);
// }

loadIFrames = function(container) {
	const iframes = container.querySelectorAll("iframe");
	iframes.forEach(iframe => (iframe.src = iframe.dataset.src));
};

//
//
//

// message from iframe: swipe-up | swipe-down | touch
function receiveMessage(e, container, tiles, layout) {
	console.log(e.data);
	const direction =
		e.data === "swipe-up"
			? "next"
			: e.data === "swipe-down"
			? "prev"
			: e.data === "start"
			? "start"
			: "";
	if (direction) scrollPage(container, tiles, layout, direction);
}

//
//
//

function scrollPage(container, tiles, { cols, rows }, direction) {
	// get Tile currently in focus
	const activeTile = container.querySelector(".active");
	const index = tiles.indexOf(activeTile);

	console.log(activeTile);
	console.log(index);

	// determine which tile to scroll to
	let nexIndex;
	let nextTile;
	switch (direction) {
		case "start":
			nextTile = tiles[0];
			break;
		case "next":
			// swipe to same tile on next page
			nextIndex = index + cols * rows;
			if (nextIndex > tiles.length - 1) nextIndex = tiles.length - 1;
			nextTile = tiles[nextIndex];
			break;
		case "prev":
			// swipe to same tile on prev page
			nextIndex = index - cols * rows;
			if (nextIndex < 0) nextIndex = 0;
			nextTile = tiles[nextIndex];
			break;
		// first / last in array
		default:
			nextTile = activeTile;
	}

	console.log("index: " + tiles.indexOf(activeTile));
	console.log("next index: " + tiles.indexOf(nextTile));

	// deactivate all tiles in case of multi col touch event (no mouseleave event)
	tiles.forEach(tile => {
		tile.classList.remove("active");
		tile.classList.remove("visible");
	});

	// activate new tile
	nextTile.classList.add("visible");
	nextTile.classList.add("active");

	// scroll
	container.style.top = nextTile.offsetTop * -1;
}

//
//
//

function setUpScroll(tiles, layout, container, fullScreen) {
	function callback(i) {
		currentPageIndex = i;
	}

	// listen to swipe events from iframe
	window.addEventListener("message", e => {
		receiveMessage(e, container, tiles, layout);
	});

	// activate first tile in full screen
	if (fullScreen) scrollPage(container, tiles, layout, "start");

	// TODO: load iframes content only when near view
	loadIFrames(container);

	// TODO
	// listen to swipe events from .overlay
	// document.addEventListener("touchstart", handleTouchStart);
	// document.addEventListener("touchend", handleTouchEnd);

	// listend to mouse scroll events from overlay
	// listen to trackpad scroll events from overlay

	// https://stackoverflow.com/questions/7408100/can-i-change-the-scroll-speed-using-css-or-jquery
	// on mousescroll
}
//
//
