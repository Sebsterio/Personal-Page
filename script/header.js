// nav scroll
// to scrol.js

// ---------------------- Layout ------------------------
// to layout.js

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

// -------------------- Shift header ------------------------

function shiftHeader(e, header) {
	header.dataset.position = e.target.dataset.direction;
}

function setUpHeader(header, layoutSelect) {
	const icons = header.querySelectorAll(".header-icon");
	icons.forEach(icon => {
		icon.addEventListener("click", e => shiftHeader(e, header));
	});
}
