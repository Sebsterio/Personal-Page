const d = document;
d.bc = d.body.classList;
d.bd = d.body.dataset;
// d.ds = d.documentElement.style;#

// const container = document.getElementById("main-content");
// const header = document.getElementById("header");
// const layoutSelect = document.getElementById("layout-select");

// Populate #main-content with projects and set up UI
function loadCatalog(catalog, pages, dom) {
	// Reset
	container = document.getElementById("main-content");
	container.innerHTML = "<h2>Loading content...</h2>";
	pages.length = 0; // valid & safe

	pages.push(...getPages(catalog[1]));
	renderPages(pages, dom.container);
	setUpPanels(pages);
	updateLayout(pages);
	initPageScroll(pages, catalog);
}

(function initApp() {
	// to remove...
	const dom = {
		container: document.getElementById("main-content"),
		header: document.getElementById("header"),
		layoutSelect: document.getElementById("layout-select")
	};

	// Layout selected by user: 0 | 1 | 2
	document.body.dataset.userLayout = -1;

	let pages = [];

	setUpPageScroll(pages, dom);
	setUpHeaderButtons();
	setupLayout(pages);

	// Nav btn click - change catalog
	const navLinks = header.querySelectorAll(".nav-btn");
	navLinks.forEach(
		link =>
			(link.onclick = () => {
				const catalog = library[link.dataset.catalog];
				loadCatalog(catalog, pages, dom);
			})
	);

	// loadCatalog(library.home, pages, layout, dom);
	loadCatalog(library.widgets, pages, dom);
})();
