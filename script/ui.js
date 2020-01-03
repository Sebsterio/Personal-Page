// Switch between showing project name and catalog name in headline
function toggleHeadlineText(layout, header) {
	if (layout === 0) header.classList.add("show-project-name");
	else header.classList.remove("show-project-name");
}

// Update headline text with project/catalog name
function updateHeadline(whichHeadline, source, header) {
	let headline = header.querySelector(`.headline-${whichHeadline}-name`);

	headline.innerText =
		whichHeadline == "project" ? source.dataset.projectName : source;

	// Update colum width to match headline text
	updateHeaderColumWidth(header, null);
}

// Move header sideways on button click
function shiftHeader(e, header, btn) {
	header.dataset.position = btn.dataset.direction;
}

// ad UI event listeners
function setUpUI(pages, layout, dom) {
	// Header buttons - shift header sideways on icon click (full-width view)
	const buttons = dom.header.querySelectorAll(".header-btn");
	buttons.forEach(btn => {
		btn.addEventListener("click", e => shiftHeader(e, dom.header, btn));
	});

	// Nav bar - change catalog
	const navLinks = dom.header.querySelectorAll(".nav-btn");
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, pages, layout, dom);
		});
	});

	// Main bar - toggle panel (full-width only)
	const bar = dom.header.querySelector(".main-bar");
	bar.addEventListener("click", () => togglePanel(dom.layoutSelect, null));

	// Options bar - change layout
	dom.layoutSelect.addEventListener("change", e => {
		handleLayoutSelectChange(e, layout, config, dom);
	});

	// Window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(layout, config, dom);
	});
}
