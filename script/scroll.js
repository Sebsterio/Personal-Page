function setUpScrollSnap(container) {
	// activate scroll-snap css
	container.classList.add("mobile");
	// TODO: .article class add css: scroll-snap-align: start;

	// set up custom scroll behaviour

	// disable scrollbar: container.overflow: hidden
	container.onscroll = () => {};

	// on mousescroll
	// https://stackoverflow.com/questions/7408100/can-i-change-the-scroll-speed-using-css-or-jquery

	// on touchstart, blockMenuHeaderScroll = true
	// on touchend, blockMenuHeaderScroll = false
	// https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
}
