// Populate #main-content with projects and set up UI
function loadCatalog(catalog, container, bar, layoutSelect) {
	container.innerHTML = "";
	const pages = getPages(catalog);
	renderPages(pages, container); // move to end?
	setUpPanels(pages, bar, layoutSelect);
	setUpScroll(pages);

	// temp pos
	updateLayout(container, layoutSelect, null);
}

function loadDoc() {
	// TODO: click -> toggle overlay
	const bar = document.getElementById("bar");

	const navLinks = document.querySelectorAll(".nav-link");
	const layoutSelect = document.getElementById("layout-select");
	const mainContent = document.getElementById("main-content");

	// init with option 1 selected, so that doc laod in narrow window (layout 0) triggers toggleDisabled() as (newLayout != currentLayout) -> (0 != 1)
	layoutSelect.value = "1";

	// Load home section on doc load
	loadCatalog(Library.home, mainContent, bar, layoutSelect);

	// Change section in nav menu
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, mainContent);
			updateLayout(mainContent, layoutSelect, null);
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
