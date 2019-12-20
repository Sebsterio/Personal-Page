// max screen width for full screen tile display
const MOBILE_MAX_WIDTH = 600;
const MIN_TILE_SIZE = 360;

function getWindowSize() {
	return {
		width:
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth,
		height:
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight
	};
}

function isScreenMobile({ width }, maxWidth) {
	return width <= maxWidth;
}

// mobile: fit tile to screen
// desktop: flex (TODO)
function getTileSize(isMobile, container, minSize) {
	let width, height;

	if (isMobile) {
		width = getComputedStyle(container).width;
		height = getComputedStyle(container).height;
	} else {
		width = minSize;
		height = minSize;
	}

	return {
		width,
		height
	};
}

function loadDoc() {
	const mainContent = document.getElementById("main-content");
	const list = document.getElementById("list");

	const isMobile = isScreenMobile(getWindowSize(), MOBILE_MAX_WIDTH);
	const tileSize = getTileSize(isMobile, mainContent, MIN_TILE_SIZE);

	list.innerHTML = "";
	mainContent.innerHTML = "";
	// add article with hello and controls info
	//   desktop: block section
	//   mobile: 1 tile
	addProjects(JS30projects, mainContent, list, tileSize);

	if (isMobile) setUpScrollSnap(mainContent);
}

// debounce not needed as iframe containers load before their content, so event re-fires before iframe scripts load
window.addEventListener("resize", loadDoc);

loadDoc();
