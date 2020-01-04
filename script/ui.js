// Update headline text with project/catalog name
function updateHeadline(whichHeadline, source, header) {
	let headline = header.querySelector(`.headline-${whichHeadline}-name`);
	headline.innerText =
		whichHeadline == "project" ? source.dataset.projectName : source;
	updateHeaderColumWidth(header); // Update to match new text
}

// Move header sideways
function shiftHeader(header, btn) {
	header.dataset.position = btn.dataset.direction;
}

// ad UI event listeners
function setUpUI(pages, dom) {
	// Window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(pages, dom);
	});

	// Header buttons click - shift header sideways on icon click (full-width view)
	const buttons = dom.header.querySelectorAll(".header-btn");
	buttons.forEach(btn => {
		btn.addEventListener("click", () => shiftHeader(dom.header, btn));
	});

	// Nav btn click - change catalog
	const navLinks = dom.header.querySelectorAll(".nav-btn");
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, pages, dom);
		});
	});

	// Main bar click - toggle panel (full-width only)
	const bar = dom.header.querySelector(".main-bar");
	bar.addEventListener("click", () => togglePanel(dom.layoutSelect, null));

	// Options bar click - change layout
	dom.layoutSelect.addEventListener("change", e => {
		handleLayoutSelectChange(e, pages, dom);
	});
}
