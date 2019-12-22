// minimum tile size for multi-column display
const TILE_BASE_SIZE = 500;

function getContainerSize(container) {
	return {
		containerWidth: parseInt(getComputedStyle(container).width),
		containerHeight: parseInt(getComputedStyle(container).height)
	};
}

// immitate `flex: 1 0 base` horizontally and vertically
function getLayout({ containerWidth, containerHeight }, base) {
	// prevent dividing by 0
	if (!base) return;

	// get number of rows and columns; minimum 1
	const cols = Math.floor(containerWidth / base) || 1;
	const rows = Math.floor(containerHeight / base) || 1;

	return {
		cols,
		rows
	};
}

function isFullScreen({ cols, rows }) {
	return cols === 1 && rows === 1;
}

function getTileSize({ containerWidth, containerHeight }, { cols, rows }) {
	return {
		width: containerWidth / cols,
		height: containerHeight / rows
	};
}

function loadDoc() {
	const mainContent = document.getElementById("main-content");

	const containerSize = getContainerSize(mainContent);
	const layout = getLayout(containerSize, TILE_BASE_SIZE);
	const fullScreen = isFullScreen(layout);
	const tileSize = getTileSize(containerSize, layout);

	list.innerHTML = "";
	mainContent.innerHTML = "";

	// add article with hello and controls info
	// renderProjects(getProjects(intro, tileSize, fullScreen = true), mainContent)

	const tiles = getProjects(JS30projects, tileSize, fullScreen); // add-projects.js
	renderProjects(tiles, mainContent); // add-projects.js
	setUpOverlays(tiles, fullScreen); // overlay.js
	setUpScroll(tiles, layout, mainContent, fullScreen); // incl iframe load
}

// TODO: debounce iframe content loading
window.addEventListener("resize", loadDoc);

loadDoc();
