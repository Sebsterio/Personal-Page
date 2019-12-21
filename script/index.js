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

function isScreenMobile({ width }) {
	return true;
}

// immitate `flex: 1 0 minSize` horizontally and vertically
function getTileSize(container, base) {
	let width = parseInt(getComputedStyle(container).width);
	let height = parseInt(getComputedStyle(container).height);

	// if width/height is a multiple of base, divide to fit within base
	console.log("container: " + width);
	if (width > base) width = width / Math.floor(width / base);
	if (height > base) height = height / Math.floor(height / base);
	console.log("tile: " + width);

	return { width, height };
}

function loadDoc() {
	const mainContent = document.getElementById("main-content");
	const list = document.getElementById("list");

	const isMobile = isScreenMobile(getWindowSize());
	const tileSize = getTileSize(mainContent, TILE_BASE_SIZE);

	list.innerHTML = "";
	mainContent.innerHTML = "";
	// add article with hello and controls info
	//   desktop: block section
	//   mobile: 1 tile
	addProjects(JS30projects, mainContent, list, tileSize);

	setUpScrollSnap(mainContent);
}

// debounce not needed as iframe containers load before their content, so event re-fires before iframe scripts load
window.addEventListener("resize", loadDoc);

loadDoc();
