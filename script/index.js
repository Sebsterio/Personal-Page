// Populate #main-content with projects and set up UI
function loadCatalog(catalog, pages, container, bar, layoutSelect) {
	container.innerHTML = "";
	pages.length = 0;
	pages.push(...getPages(catalog));
	renderPages(pages, container); // move to end?
	setUpPanels(pages, bar, layoutSelect);
	setUpScroll(pages);
	updateLayout(container, layoutSelect, null);
}

function loadDoc() {
	const bar = document.getElementById("bar");
	const navLinks = document.querySelectorAll(".nav-link");
	const layoutSelect = document.getElementById("layout-select");
	const mainContent = document.getElementById("main-content");

	let pages = [];

	// init with option 1 selected, so that doc laod in narrow window (layout 0) triggers toggleDisabled() as (newLayout != currentLayout) -> (0 != 1)
	layoutSelect.value = "1";

	// Load home section on doc load
	loadCatalog(Library.home, pages, mainContent, bar, layoutSelect);

	// Change section in nav menu
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, pages, mainContent, bar, layoutSelect);
		});
	});

	// Change layout in UI
	layoutSelect.addEventListener("change", e => {
		updateLayout(mainContent, layoutSelect, e);
	});

	// Window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(mainContent, layoutSelect, null);
	});
}

loadDoc();
