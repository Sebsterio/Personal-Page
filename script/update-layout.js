(function() {
	// Minimum screen width for 2-col layout
	const SPLIT_LAYOUT_MIN_WIDTH = 800;

	// iframe width in "mobile screen" layout
	const NARROW_LAYOUT_WIDTH = 400;

	// px -> num
	function getContainerSize(container) {
		return {
			width: parseInt(getComputedStyle(container).width),
			height: parseInt(getComputedStyle(container).height)
		};
	}

	// Enable/disable selectEl options at resize boundry
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

	function getPageSizes({ width, height }, layout) {
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
			frameWidth = NARROW_LAYOUT_WIDTH;
			panelWidth = width - NARROW_LAYOUT_WIDTH;
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

	// Update frame and panel size and layoutSelect options according to screen size
	let userLayout;
	window.updateLayout = function(container, selectEl, event) {
		const containerSize = getContainerSize(container);
		let newLayout;

		// UI select layout
		if (event) {
			userLayout = newLayout = Number(event.target.value);
		}
		// Window resize | loadDoc()
		else {
			newLayout = containerSize.width >= SPLIT_LAYOUT_MIN_WIDTH ? 1 : 0;
			const currentLayout = Number(selectEl.value);
			// at resize boundry
			if (newLayout !== currentLayout) {
				toggleDisabled(selectEl, !newLayout);
				if (newLayout && !isNaN(userLayout)) newLayout = userLayout;
				selectEl.value = newLayout;
			}
		}

		// Update page classes (layout) and iframe & panel sizes
		const pageSizes = getPageSizes(containerSize, newLayout);
		updatePages(container, newLayout, pageSizes);
	};
})();

// JUST IN CASE
//
// // Window resize | loadDoc()
// else {
// 	// wide screen
// 	if (containerSize.width >= SPLIT_LAYOUT_MIN_WIDTH) {
// 		newLayout = 1;
// 		toggleDisabled(selectEl, false);
// 		if (!isNaN(userLayout)) newLayout = userLayout;
// 	}
// 	// narrow screen
// 	else {
// 		newLayout = 0;
// 		toggleDisabled(selectEl, true);
// 	}
// 	// update selectEl if layout changed
// 	if (newLayout !== currentLayout) selectEl.value = newLayout;
// }
