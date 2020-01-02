// Populate #main-content with projects and set up UI
function loadCatalog(catalog, pages, container, header, layoutSelect) {
	container.innerHTML = "<h2>Loading content...</h2>";
	pages.length = 0; // valid & safe
	pages.push(...getPages(catalog));
	renderPages(pages, container);
	loadFirstFrames(pages);
	setUpPanels(pages, header, layoutSelect);
	updateLayout(null, container, header, layoutSelect);
}

function loadDoc() {
	const header = document.getElementById("header");
	const layoutSelect = document.getElementById("layout-select");
	const container = document.getElementById("main-content");

	// Declare once and mutate on loadCatalog() instead of redeclaring so that event listeners that take it as parameter can be declared only once
	let pages = [];

	// Load home section on doc load
	loadCatalog(Library.home, pages, container, header, layoutSelect);

	setUpScroll(pages, container, header, layoutSelect);
	setUpHeader(pages, container, header, layoutSelect);

	// Window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(null, container, header, layoutSelect);
	});
}

loadDoc();
