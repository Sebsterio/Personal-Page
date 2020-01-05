// Update headline text with project/catalog name
function updateHeadline(whichHeadline, source, header) {
	let headline = header.querySelector(`.headline-${whichHeadline}-name`);
	headline.innerText =
		whichHeadline == "project" ? source.dataset.projectName : source;
	updateHeaderColumWidth(header); // Update to match new text
}

function handleCustomWidthInput(input, pages, ready) {
	if (!ready) return;
	const root = document.documentElement.style;
	const inputLabel = document.getElementById("custom-width-label");
	inputLabel.innerText = input.value + "px";
	root.setProperty("--custom-width", input.value + "px");
	updateFrameSize(pages); // frame.width = frameContainer.width
	// input.setAttribute("value", input.value);
}

//
//
// add UI event listeners
function setUpUI(pages, dom) {
	// Window resize (includes orientationchange)
	window.addEventListener("resize", () => {
		updateLayout(pages, dom);
	});

	// Header buttons click - shift header sideways on icon click (full-width view)
	const buttons = dom.header.querySelectorAll(".header-btn");
	buttons.forEach(btn => {
		btn.addEventListener(
			"click",
			() => (dom.header.dataset.position = btn.dataset.direction)
		);
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
	bar.addEventListener("click", () => togglePanel(null));

	// Options bar click - change layout
	dom.layoutSelect.addEventListener("change", e => {
		handleLayoutSelectChange(e, pages);
	});

	// Custom-width slider - change iframe width
	const input = document.getElementById("custom-width");
	inputReady = false;
	input.addEventListener("mousedown", () => (inputReady = true));
	input.addEventListener("mouseup", () => (inputReady = false));
	input.addEventListener("mousemove", () =>
		handleCustomWidthInput(input, pages, inputReady)
	);
	input.addEventListener("touchmove", () =>
		handleCustomWidthInput(input, pages, true)
	);
	input.addEventListener("change", () =>
		handleCustomWidthInput(input, pages, true)
	);
	// on initApp()
	handleCustomWidthInput(input, pages, true);
}
