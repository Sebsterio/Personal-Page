const TILE_BASE_SIZE = 500;

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

function checkFullScreen(container, base) {
	// for overlay fade on hover vs on scroll
	return container.width < 2 * base && container.height < 2 * base;
}

// immitate `flex: 1 0 minSize` horizontally and vertically
function getTileSize(container, base) {
	// get container width/height
	let width = parseInt(getComputedStyle(container).width);
	let height = parseInt(getComputedStyle(container).height);

	// if width/height is a multiple of base, divide to fit within base
	if (width > base) width = width / Math.floor(width / base);
	if (height > base) height = height / Math.floor(height / base);

	return { width, height };
}

function loadDoc() {
	const mainContent = document.getElementById("main-content");
	const list = document.getElementById("list");

	let isFullScreen = checkFullScreen(mainContent, TILE_BASE_SIZE);

	const tileSize = getTileSize(mainContent, TILE_BASE_SIZE);

	list.innerHTML = "";
	mainContent.innerHTML = "";
	// add article with hello and controls info
	//   desktop: block section
	//   mobile: 1 tile
	addProjects(JS30projects, mainContent, list, tileSize);
	setUpScroll(mainContent, isFullScreen);
}

// debounce not needed as iframe containers load before their content, so event re-fires before iframe scripts load
window.addEventListener("resize", loadDoc);

loadDoc();
