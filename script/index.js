// Populate #main-content with projects and set up UI
function loadCatalog(catalog, pages, container, header, layoutSelect) {
	container.innerHTML = "<h2>Loading content...</h2>";
	pages.length = 0; // valid & safe
	pages.push(...getPages(catalog));
	renderPages(pages, container); // move to end?
	setUpPanels(pages, header, layoutSelect);
	setUpScroll(pages, container, layoutSelect);
	updateLayout(null, container, layoutSelect, header);
	setUpHeader(header, layoutSelect);
}

function loadDoc() {
	const header = document.getElementById("header");
	const navLinks = document.querySelectorAll(".nav-link");
	const layoutSelect = document.getElementById("layout-select");
	const container = document.getElementById("main-content");

	// Declare once and mutate on loadCatalog() instead of redeclaring so that event listeners that take it as parameter can be declared only once
	let pages = [];

	// Load home section on doc load
	loadCatalog(Library.home, pages, container, header, layoutSelect);

	// Change section in nav menu
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, pages, container, header, layoutSelect);
		});
	});

	// Change layout in UI
	layoutSelect.addEventListener("change", e => {
		updateLayout(e, container, layoutSelect, header);
	});

	// Window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(null, container, layoutSelect, header);
	});
}

loadDoc();
