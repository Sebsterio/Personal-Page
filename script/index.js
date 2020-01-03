const config = {
	// Minimum screen width for 2-col layout
	threshold: 800,

	// iframe width in "mobile screen" layout
	narrow: 400
};

// Populate #main-content with projects and set up UI
function loadCatalog(catalog, pages, layout, dom) {
	dom.container.innerHTML = "<h2>Loading content...</h2>";
	pages.length = 0; // valid & safe
	pages.push(...getPages(catalog[1]));
	renderPages(pages, dom.container);
	setUpPanels(pages, dom.layoutSelect);
	updateLayout(layout, config, dom);
	loadFirstFrames(pages);
	updateHeadline("catalog", catalog[0], dom.header);
	updateHeadline("project", pages[0], dom.header);
}

(function initApp(config) {
	const dom = {
		container: document.getElementById("main-content"),
		header: document.getElementById("header"),
		layoutSelect: document.getElementById("layout-select")
	};

	let pages = [];

	const layout = {
		screenIsWide: null, // container.width > threshold
		userLayout: -1 // Layout selected by user: 0 | 1 | 2
	};

	setUpScroll(pages, dom);
	setUpUI(pages, layout, dom);

	// Load home section on doc load
	loadCatalog(Library.home, pages, layout, dom);
})(config);
