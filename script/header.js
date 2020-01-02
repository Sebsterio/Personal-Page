function shiftHeader(e, header, btn) {
	header.dataset.position = btn.dataset.direction;
}

function updateMainBar(layoutSelect, header) {
	if (layoutSelect.value === "0") {
		// add class for cursor: pointer
		//Text toggle: site title / "show details ( i )"
		// TODO: mainBar to contain 2 text nodes. only one displayed at a time dependin gon class .extended
	}
}

// ---------------------- Layout ------------------------

// Update grid column width so that middle col contains .headline withtout breaking and side cols fill remaining space
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
	const buttons = header.querySelectorAll(".header-btn");
	buttons.forEach(btn => {
		btn.addEventListener("click", e => shiftHeader(e, header, btn));
	});

	// Change webpage in nav menu
	const navLinks = header.querySelectorAll(".nav-li");
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
