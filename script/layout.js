(function() {
	// Enable/disable selectEl options at resize boundry
	function toggleDisabledLayoutOptions(selectEl, doDisable) {
		const option1 = selectEl.querySelector('option[value="1"]');
		const option2 = selectEl.querySelector('option[value="2"]');
		if (doDisable) {
			option1.setAttribute("disabled", true);
			option2.setAttribute("disabled", true);
		} else {
			// setAttribute('disabled', false) doesn't work
			option1.removeAttribute("disabled");
			option2.removeAttribute("disabled");
		}
	}

	// ---------------------- Pages ------------------------

	function getPageSizes({ width, height }, layout, config) {
		let frameWidth, panelWidth;
		// Full width
		if (layout === 0) {
			frameWidth = panelWidth = width;
		}
		// Half width
		else if (layout === 1) {
			frameWidth = panelWidth = width / 2;
		}
		// Narrow width
		else if (layout === 2) {
			frameWidth = config.narrow;
			panelWidth = width - config.narrow;
		} else new Error("layout type error");
		return {
			frameWidth,
			panelWidth,
			height: height
		};
	}

	function updatePages(container, layout, pageSizes) {
		const pages = container.querySelectorAll(".page");
		pages.forEach(page => {
			if (layout > 0) page.classList.remove("full-width");
			else page.classList.add("full-width");

			const frame = page.querySelector("iframe");
			const panel = page.querySelector(".panel");

			frame.width = pageSizes.frameWidth;
			frame.height = pageSizes.height;

			// Redundant, just use css <-- TODO
			panel.style.width = pageSizes.panelWidth;
			panel.style.height = pageSizes.height;
		});
	}

	// ---------------------- Header ------------------------

	window.updateHeaderColumWidth = function(header, screenIsWide) {
		// Desktop - Middle col contains .headline without breaking; side cols fill remaining space
		if (screenIsWide) {
			const mainBar = header.querySelector(".main-bar");
			const headerWidth = parseInt(header.offsetWidth);
			const mainBarWidth = parseInt(mainBar.scrollWidth);
			const newSideBarWidth = (headerWidth - mainBarWidth) / 2;

			// Some padding seems needed to keep mainBar in one line when resizing window rapidly
			const colSide = `${newSideBarWidth - 10}px`;
			const colMiddle = `${mainBarWidth + 20}px`;
			header.style.gridTemplateColumns =
				colSide + " " + colMiddle + " " + colSide;
		}
		// Mobile
		else {
			header.style.gridTemplateColumns = "100% 100% 100%";
		}
	};

	// depends on screen with; disregards userLayout
	function updateHeaderLayout(header, screenIsWide) {
		// header {width: 100%}
		if (screenIsWide) header.classList.add("screen-is-wide");
		// header {width: 300%}
		else header.classList.remove("screen-is-wide");
	}

	// ---------------------- Get & set ------------------------

	// px -> num
	function getContainerSize(container) {
		return {
			width: parseInt(getComputedStyle(container).width),
			height: parseInt(getComputedStyle(container).height)
		};
	}

	// Turn screenIsWide into newLayout, considering userLayout
	function getLayout(screenIsWide, userLayout) {
		if (screenIsWide && userLayout > -1) return userLayout;
		else return screenIsWide;
	}

	function setLayout(containerSize, newLayout, dom, config) {
		const pageSizes = getPageSizes(containerSize, newLayout, config);
		updatePages(dom.container, newLayout, pageSizes);
		toggleHeadlineText(newLayout, dom.header);
		if (newLayout > 0) updateHeaderColumWidth(dom.header, true);
	}

	window.handleLayoutSelectChange = function(e, layout, config, dom) {
		const containerSize = getContainerSize(dom.container);
		let newLayout = Number(e.target.value);
		layout.userLayout = newLayout;
		setLayout(containerSize, newLayout, dom, config);
	};

	window.updateLayout = function({ screenIsWide, userLayout }, config, dom) {
		const containerSize = getContainerSize(dom.container);
		let newWidthRange = containerSize.width >= config.threshold ? 1 : 0;

		// at resize boundry | initApp()
		if (newWidthRange !== screenIsWide) {
			screenIsWide = newWidthRange;
			toggleDisabledLayoutOptions(dom.layoutSelect, !screenIsWide);
			updateHeaderLayout(dom.header, !!screenIsWide);
		}

		const newLayout = getLayout(screenIsWide, userLayout);
		dom.layoutSelect.value = newLayout;
		setLayout(containerSize, newLayout, dom, config.narrow);
		updateHeaderColumWidth(dom.header, screenIsWide);
	};
})();
