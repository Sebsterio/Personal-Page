function shiftHeader(e, header, btn) {
	header.dataset.position = btn.dataset.direction;
}

function updateHeadline(layoutSelect, header) {
	if (layoutSelect.value === "0") header.classList.add("full-width");
	else header.classList.remove("full-width");
}

// ---------------------- Layout ------------------------

// Middle col contains .headline without breaking; side cols fill remaining space
function setExtendedLayout(header) {
	header.classList.add("extended");

	const mainBar = header.querySelector(".main-bar");
	const headerWidth = parseInt(header.offsetWidth);
	const mainBarWidth = parseInt(mainBar.scrollWidth);
	const newSideBarWidth = (headerWidth - mainBarWidth) / 2;

	// Some padding seems needed to keep mainBar in one line when resizing window rapidly
	const colSide = `${newSideBarWidth - 10}px`;
	const colMiddle = `${mainBarWidth + 20}px`;
	header.style.gridTemplateColumns = colSide + " " + colMiddle + " " + colSide;
}

// Each header column has full width
function setMobileLayout(header) {
	header.classList.remove("extended");
	header.style.gridTemplateColumns = "100% 100% 100%";
}

// Update grid column width
function updateHeaderLayout(header, isExtended) {
	if (isExtended) setExtendedLayout(header);
	else setMobileLayout(header);
}

// ------------------- Set up header ------------------------

function setUpHeader(pages, container, header, layoutSelect) {
	// Header buttons - shift header sideways on icon click (full-width view)
	const buttons = header.querySelectorAll(".header-btn");
	buttons.forEach(btn => {
		btn.addEventListener("click", e => shiftHeader(e, header, btn));
	});

	// Nav bar - change project catalog
	const navLinks = header.querySelectorAll(".nav-btn");
	navLinks.forEach(link => {
		link.addEventListener("click", () => {
			const catalog = Library[link.dataset.catalog];
			loadCatalog(catalog, pages, container, header, layoutSelect);
		});
	});

	// Main bar - toggle panel (full-width only)
	const bar = header.querySelector(".main-bar");
	bar.addEventListener("click", () => togglePanel(layoutSelect, null));

	// Options bar - change main-content layout
	layoutSelect.addEventListener("change", e => {
		updateLayout(e, container, layoutSelect, header);
	});
}
