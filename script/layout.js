(function() {
	// Screen width at which split-view layout becomes available
	const BREAKPOINT_WIDTH = 800;

	// = isScreenAboveThreshold() prior to / after resize
	let screenWasWide;
	let screenIsWide;

	// ------------------------ Set layout ----------------------

	function updatePages(pages) {
		pages.forEach(page => {
			const wrapper = page.querySelector(".project");
			const frame = page.querySelector("iframe");
			frame.width = parseInt(getComputedStyle(wrapper).width);
			frame.height = parseInt(getComputedStyle(wrapper).height);
		});
	}

	// Switch between showing project name and catalog name in headline
	function toggleHeadlineText(layout, header) {
		if (layout === 0) header.classList.add("show-project-name");
		else header.classList.remove("show-project-name");
	}

	// Desktop only. Middle col contains headline without breaking; side cols fill remaining space
	// I coulnd't find a pure CSS solution
	// screenIsWide logic here becasue fn is also called in scroll.js and screenIsWide variable is defined in the scope of this file
	window.updateHeaderColumWidth = function(header) {
		if (screenIsWide) {
			// ensure headline text doesn't break when taking its width
			rootVar = document.documentElement.style;
			rootVar.setProperty("--header-grid", "0 100% 0");

			const mainBar = header.querySelector(".main-bar");
			const headerWidth = parseInt(header.offsetWidth);
			const mainBarWidth = parseInt(mainBar.scrollWidth);
			const newSideBarWidth = (headerWidth - mainBarWidth) / 2;

			// Some padding seems needed to keep mainBar from breaking when resizing window rapidly
			const colSide = `${newSideBarWidth - 2}px`;
			const colMiddle = `${mainBarWidth + 4}px`;
			newGrid = colSide + " " + colMiddle + " " + colSide;
			rootVar.setProperty("--header-grid", newGrid);
		}
	};

	function setLayout(pages, newLayout, dom) {
		if (newLayout === 0) d.bc.add("full-width");
		else d.bc.remove("full-width");

		updatePages(pages);
		toggleHeadlineText(newLayout, dom.header);
		updateHeaderColumWidth(dom.header, !newLayout);
	}

	// -------------------- resize | initApp() -------------------------

	// Update form value and disable options
	function updateLayoutSelectForm(screenIsWide, newLayout) {
		const selectEl = document.getElementById("layout-select");
		selectEl.value = newLayout;

		// Disable layout options 1 & 2 in narrow screen
		const option1 = selectEl.querySelector('option[value="1"]');
		const option2 = selectEl.querySelector('option[value="2"]');
		if (!screenIsWide) {
			option1.setAttribute("disabled", true);
			option2.setAttribute("disabled", true);
		} else {
			// setAttribute('disabled', false) doesn't work
			option1.removeAttribute("disabled");
			option2.removeAttribute("disabled");
		}
	}

	window.isScreenAboveThreshold = function(dom) {
		const containerWidth = parseInt(getComputedStyle(dom.container).width);
		return containerWidth >= BREAKPOINT_WIDTH;
	};

	// On resize
	window.updateLayout = function(pages, dom) {
		screenIsWide = isScreenAboveThreshold(dom);
		const userLayout = d.bd.userLayout;
		const newLayout =
			screenIsWide && Number(userLayout) > -1
				? Number(userLayout)
				: Number(screenIsWide);

		setLayout(pages, newLayout, dom);

		// At resize breakpoint
		if (screenIsWide !== screenWasWide) {
			screenWasWide = screenIsWide;
			updateLayoutSelectForm(screenIsWide, newLayout);
		}
	};

	// ---------------------- UI select layout -------------------------

	// Set layout to user-selected layout
	window.handleLayoutSelectChange = function(e, pages, dom) {
		userLayout = Number(e.target.value);
		document.body.dataset.userLayout = userLayout;
		setLayout(pages, userLayout, dom);
	};
})();
