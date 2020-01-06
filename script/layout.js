(function() {
	// Screen width at which split-view layout becomes available
	const BREAKPOINT_WIDTH = 800;

	// is screen above BREAKPOINT_WIDTH at the beginning / end of resize event
	let screenWasWide;
	let screenIsWide;

	// ------------------------ Set layout ----------------------

	// Update iframe sizes to match their container (no CSS solution found)
	window.updateFrameSize = function(pages) {
		pages.forEach(page => {
			const wrapper = page.querySelector(".project");
			const frame = page.querySelector("iframe");
			frame.width = parseInt(getComputedStyle(wrapper).width);
			frame.height = parseInt(getComputedStyle(wrapper).height);
		});
	};

	// Update Header grid layout in media query (width > 800)
	// Middle col contains headline without breaking; side cols fill remaining space (I coulnd't find a pure CSS solution)
	window.updateHeaderColumWidth = function() {
		// screenIsWide logic here becasue fn is also called in scroll.js and screenIsWide variable is defined in the scope of this file
		if (!screenIsWide) return;

		// Ensure headline text isn't breaking when getting its width
		const root = document.documentElement.style;
		root.setProperty("--header-grid", "0 100% 0");

		const header = document.getElementById("header");
		const mainBar = header.querySelector(".main-bar");
		const headerWidth = parseInt(header.offsetWidth);
		const mainBarWidth = parseInt(mainBar.scrollWidth);
		const newSideBarWidth = (headerWidth - mainBarWidth) / 2;

		// Some padding seems needed to keep mainBar from breaking when resizing window rapidly
		const colSide = `${newSideBarWidth - 2}px`;
		const colMiddle = `${mainBarWidth + 4}px`;
		const newGrid = colSide + " " + colMiddle + " " + colSide;
		root.setProperty("--header-grid", newGrid);
	};

	// Update view
	function setLayout(pages, newLayout) {
		if (newLayout === 0) document.body.classList.add("full-width");
		else document.body.classList.remove("full-width");

		if (newLayout === 2) document.body.classList.add("custom-width");
		else document.body.classList.remove("custom-width");

		updateFrameSize(pages);
		updateHeaderColumWidth(!newLayout);
	}

	// -------------------- resize | initApp() -------------------------

	function updateLayoutSelectForm(screenIsWide, newLayout) {
		// Update selected option (i.e. form value)
		const selectEl = document.getElementById("layout-select");
		selectEl.value = newLayout;

		// Disable options 1 & 2 in narrow screen
		const options = selectEl.querySelectorAll('option:not([value="0"])');
		options.forEach(option => {
			if (!screenIsWide) option.setAttribute("disabled", true);
			else option.removeAttribute("disabled");
		});
	}

	// On resize | initApp()
	window.updateLayout = function(pages) {
		const container = document.getElementById("main-content");
		const containerWidth = parseInt(getComputedStyle(container).width);
		screenIsWide = containerWidth >= BREAKPOINT_WIDTH;

		const userLayout = document.body.dataset.userLayout;
		const newLayout =
			screenIsWide && Number(userLayout) > -1
				? Number(userLayout)
				: Number(screenIsWide);

		setLayout(pages, newLayout);

		// Update max custom width
		const input = document.getElementById("custom-width");
		input.setAttribute("max", containerWidth);

		// At resize breakpoint
		if (screenIsWide !== screenWasWide) {
			screenWasWide = screenIsWide;
			updateLayoutSelectForm(screenIsWide, newLayout);
		}
	};

	// -------------------- Setup -------------------------

	// Set layout to user-selected layout
	function handleLayoutSelectChange(e, pages) {
		userLayout = Number(e.target.value);
		document.body.dataset.userLayout = userLayout;
		setLayout(pages, userLayout);
	}

	// Change iframe width in custom-width view
	function changeCustomWidth(input, pages, ready) {
		if (!ready) return;
		const root = document.documentElement.style;
		const inputLabel = document.getElementById("custom-width-label");
		inputLabel.innerText = input.value + "px";
		root.setProperty("--custom-width", input.value + "px");
		updateFrameSize(pages); // frame.width = frameContainer.width
		// input.setAttribute("value", input.value);
	}

	window.setupLayout = function(pages) {
		// Window resize (includes orientationchange)
		window.onresize = () => updateLayout(pages);

		// Layout select form input
		const layoutSelect = document.getElementById("layout-select");
		layoutSelect.onchange = e => handleLayoutSelectChange(e, pages);

		// Custom-width slider input
		const input = document.getElementById("custom-width");
		inputReady = false;
		input.onmousedown = () => (inputReady = true);
		input.onmouseup = () => (inputReady = false);
		input.onmousemove = () => changeCustomWidth(input, pages, inputReady);
		input.onchange = () => changeCustomWidth(input, pages, true);
		input.addEventListener("touchmove", () =>
			changeCustomWidth(input, pages, true)
		);
		// on initApp()
		changeCustomWidth(input, pages, true);
	};
})();
