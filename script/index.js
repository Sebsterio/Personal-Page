function loadCatalog(catalog, container, layoutSelect) {
	container.innerHTML = "";
	const pages = getPages(catalog);
	renderPages(pages, container); // move to end?
	setUpPanels(pages, title, layoutSelect);
	setUpScroll(pages);
}

function loadDoc() {
	// TODO: click -> toggle overlay
	const title = document.getElementById("title");

	const navLinks = document.querySelectorAll(".nav-link");
	const layoutSelect = document.getElementById("layout-select");
	const mainContent = document.getElementById("main-content");

	// Load home section on doc load
	loadCatalog(Library.home, mainContent, layoutSelect);

	// move inside loadCatalog, before setUPScroll?
	updateLayout(mainContent, layoutSelect, null);

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
