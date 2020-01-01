function shiftHeader(e, header) {
	header.dataset.position = e.target.dataset.direction;
}

function updateMainBar(layoutSelect, header) {
	if (layoutSelect.value === "0") {
		// add class for cursor: pointer
		//Text toggle: site title / "show details ( i )"
		// TODO: mainBar to contain 2 text nodes. only one displayed at a time dependin gon class .extended
	}
}

// ---------------------- Layout ------------------------

// Update grid column width so that middle bar is always centered and (width: auto) and side-bars fill remaining space
function setExtendedLayout(header) {
	header.classList.add("extended");

	const mainBar = header.querySelector(".main-bar");
	const headerWidth = parseInt(header.offsetWidth);
	const mainBarWidth = parseInt(mainBar.offsetWidth);
	const newSideBarWidth = (headerWidth - mainBarWidth) / 2;

	// Some padding seems needed to keep mainBar in one line when resizing window rapidly
	const col1 = `${newSideBarWidth - 10}px`;
	const col2 = `${mainBarWidth + 20}px`;
	const col3 = `${newSideBarWidth - 10}px`;
	header.style.gridTemplateColumns = col1 + " " + col2 + " " + col3;
}

function setMobileLayout(header) {
	header.classList.remove("extended");
	header.style.gridTemplateColumns = "100% 100% 100%";
}

function updateHeaderLayout(header, isExtended) {
	if (isExtended) setExtendedLayout(header);
	else setMobileLayout(header);
}

// ------------------- Set up header ------------------------

function setUpHeader(pages, container, header, layoutSelect) {
	// Shift header sideways on icon click (in full-width view)
	const icons = header.querySelectorAll(".header-icon");
	icons.forEach(icon => {
		icon.addEventListener("click", e => shiftHeader(e, header));
	});

	// Change webpage in nav menu
	const navLinks = header.querySelectorAll(".nav-link");
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

	// Toggle panel in full-view
	const bar = header.querySelector(".main-bar");
	bar.addEventListener("click", () => togglePanel(layoutSelect, null));
}
