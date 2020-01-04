const d = document;
d.bc = d.body.classList;
d.bd = d.body.dataset;
d.bs = d.body.style;

// Populate #main-content with projects and set up UI
function loadCatalog(catalog, pages, dom) {
	dom.container.innerHTML = "<h2>Loading content...</h2>";
	pages.length = 0; // valid & safe
	pages.push(...getPages(catalog[1]));
	renderPages(pages, dom.container);
	setUpPanels(pages, dom.layoutSelect);
	updateLayout(pages, dom);
	loadFirstFrames(pages);
	updateHeadline("catalog", catalog[0], dom.header);
	updateHeadline("project", pages[0], dom.header);
}

(function initApp() {
	// to remove...
	const dom = {
		container: document.getElementById("main-content"),
		header: document.getElementById("header"),
		layoutSelect: document.getElementById("layout-select")
	};

	// Layout selected by user: 0 | 1 | 2
	d.bd.userLayout = -1;

	let pages = [];

	setUpScroll(pages, dom);
	setUpUI(pages, dom);

	// loadCatalog(Library.home, pages, layout, dom);
	loadCatalog(Library.widgets, pages, dom);
})();
