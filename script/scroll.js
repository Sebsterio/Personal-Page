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
function scrollPage(container, pages, index, direction, callback) {
	let newIndex = index;
	if (direction === "start") {
		newIndex = 0;
	}
	if (direction === "prev" && index !== 0) {
		newIndex = index - 1;
	}
	if (direction === "next" && index !== pages.length) {
		newIndex = index + 1;
	}

	// TODO: support multi-column display:
	// find next/prevElementSibling whose offset top !=- current article offset top

	// scroll
	container.style.top = pages[newIndex].offsetTop * -1;

	// update currentPageIndex
	callback(newIndex);

	//
	// fullscreen only
	//

	// add overlay to previous page
	const currentOverlay = pages[index].querySelector(".overlay");
	currentOverlay.style.zIndex = "initial";
	currentOverlay.classList.remove("hover");

	//remove overlay from current page
	setTimeout(() => {
		const nextOverlay = pages[newIndex].querySelector(".overlay");
		nextOverlay.classList.add("hover");
	}, 500);
}

//
//
//

// message from iframe: swipe-up | swipe-down | touch
function receiveMessage(e, container, pages, index, callback) {
	const direction =
		e.data === "swipe-up"
			? "next"
			: e.data === "swipe-down"
			? "prev"
			: e.data === "start"
			? "start"
			: "";
	if (direction) scrollPage(container, pages, index, direction, callback);
}

//
//
//

function setUpScroll(container, isFullScreen) {
	const pages = Array.from(container.querySelectorAll("article"));
	let currentPageIndex = 0;

	function callback(i) {
		currentPageIndex = i;
	}

	// listen to swipe events from iframe
	window.addEventListener("message", e => {
		receiveMessage(e, container, pages, currentPageIndex, callback);
	});

	// listen to swipe events from .overlay
	// seems not needed as messageEvent bubbles
	// document.addEventListener("touchstart", handleTouchStart);
	// document.addEventListener("touchend", handleTouchEnd);

	// TODO
	// listend to mouse scroll events from document/window
	// listen to trackpad scroll events from document/window

	// on mousescroll
	// https://stackoverflow.com/questions/7408100/can-i-change-the-scroll-speed-using-css-or-jquery
}
//
//
//
// on touchstart, blockMenuHeaderScroll = true
// on touchend, blockMenuHeaderScroll = false
// https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
