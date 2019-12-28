// minimum screen width for 2-col layout
const BOOK_LAYOUT_MIN_WIDTH = 800;

// iframe width in "mobile view"
const NARROW_LAYOUT_WIDTH = 400;

function loadCatalog(catalog, container, layoutSelect) {
	container.innerHTML = "";
	const pages = getPages(catalog);
	renderPages(pages, container);
	//setUpOverlays(pages, layout);
	setUpScroll(pages, container, layoutSelect);
}

function loadDoc() {
	const navLinks = document.querySelectorAll(".nav-link");
	const title = document.getElementById("title"); // click -> toggle overlay
	const layoutSelect = document.getElementById("layout-select");
	const mainContent = document.getElementById("main-content");

	// load home section
	loadCatalog(Library.home, mainContent, layoutSelect);
	updateLayout(mainContent, layoutSelect, null);

	// change section
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, mainContent);
			updateLayout(mainContent, layoutSelect, null);
		});
	});

	// select different layout
	layoutSelect.addEventListener("change", e => {
		updateLayout(mainContent, layoutSelect, e);
	});

	// window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(mainContent, layoutSelect, null);
	});
}

loadDoc();
