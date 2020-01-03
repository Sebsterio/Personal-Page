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
	pages.push(...getPages(catalog));
	renderPages(pages, dom.container);
	setUpPanels(pages, dom.layoutSelect);
	updateLayout(layout, config, dom);
	loadFirstFrames(pages);
}

(function initApp(config) {
	const dom = {
		container: document.getElementById("main-content"),
		header: document.getElementById("header"),
		layoutSelect: document.getElementById("layout-select")
	};
	const container = document.getElementById("main-content");
	const header = document.getElementById("header");
	const layoutSelect = document.getElementById("layout-select");

	let pages = []; //

	const layout = {
		screenIsWide: null, // container.width > threshold ? 1 : 0
		userLayout: -1 // Layout selected by user
	};

	setUpScroll(pages, container, header, layoutSelect);
	setUpUI(pages, layout, dom);

	// Load home section on doc load
	loadCatalog(Library.home, pages, layout, dom);
})(config);
