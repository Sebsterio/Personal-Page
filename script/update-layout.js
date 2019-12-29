(function() {
	function getContainerSize(container) {
		return {
			containerWidth: parseInt(getComputedStyle(container).width),
			containerHeight: parseInt(getComputedStyle(container).height)
		};
	}

	function toggleDisabled(selectEl, doDisable) {
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

	function getLayout(containerSize, min) {
		if (containerSize.containerWidth > min) return 1;
		else return 0;
	}

	function updateLayoutSelect(layoutSelect, layout) {
		if (layout > 0) {
			toggleDisabled(layoutSelect, false);
			layoutSelect.value = layout;
		} else {
			toggleDisabled(layoutSelect, true);
			layoutSelect.value = 0;
		}
	}

	function getPageSizes({ containerWidth, containerHeight }, layout) {
		let frameWidth, panelWidth;
		if (layout === 0) {
			// Full width
			frameWidth = panelWidth = containerWidth;
		} else if (layout === 1) {
			// Half width
			frameWidth = panelWidth = containerWidth / 2;
		} else if (layout === 2) {
			// Narrow width
			frameWidth = NARROW_LAYOUT_WIDTH;
			panelWidth = containerWidth - NARROW_LAYOUT_WIDTH;
		} else new Error("layout type error");
		return {
			frameWidth,
			panelWidth,
			height: containerHeight
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

	// Update frame and panel size and layoutSelect options according to screen size
	// let userLayout;
	window.updateLayout = function(container, selectEl, event) {
		const containerSize = getContainerSize(container);
		const newLayout = event
			? // UI select
			  Number(event.target.value)
			: // window resize
			  getLayout(containerSize, BOOK_LAYOUT_MIN_WIDTH);
		const pageSizes = getPageSizes(containerSize, newLayout);

		// On load/resize, enable/disable #layout-select options
		if (!event) updateLayoutSelect(selectEl, newLayout);

		// Update page classes (layout) and iframe & panel sizes
		updatePages(container, newLayout, pageSizes);

		// TODO: only update layout at boundry or UI select
		// if (newLayout !== userLayout)
		// currentLayout = newLayout;
	};
})();
