(function() {
	function handleTransitionEnd(e) {
		// When .panel slid out, move it behind iframe (legacy - originally it faded-out so had to be moved in z axis; keeping the code for now)
		if (
			e.propertyName == "transform" &&
			e.target.classList.contains("panel") &&
			!e.target.classList.contains("visible")
		) {
			e.target.classList.remove("on-top");
			e.target.classList.remove("expanding");
			e.target.classList.remove("expanded");
		}
		// When .panel-title moved up, show .panel-p
		else if (
			e.propertyName === "flex-shrink" &&
			e.target.classList.contains("panel-title")
		) {
			if (e.target.parentElement.classList.contains("expanding"))
				e.target.parentElement.classList.add("expanded");
			// handle abort (mouseleave)
			else e.target.parentElement.classList.remove("hover");
		}
		// When .panel-p dissapeard, move .panel-title back to center
		else if (
			e.propertyName === "transform" &&
			e.target.classList.contains("panel-p-main")
		) {
			if (!e.target.parentElement.classList.contains("expanding"))
				e.target.parentElement.classList.remove("hover");
			// handle abort (mouseenter)
			else e.target.parentElement.classList.add("expanded");
		}
	}

	function switchPanel(panel, activate) {
		//const panel = document.querySelector(".page:not(.disabled) .panel");
		if (activate) {
			panel.classList.add("expanding");
			panel.classList.add("hover");
			// -> transitionend adds class .expanded
		} else {
			panel.classList.remove("expanding");
			panel.classList.remove("expanded");
			// -> transitionend removes class .hover
		}
	}

	// Display .panel-p on .panel:hover
	function addHoverInteractions(panel, layoutSelect) {
		panel.addEventListener("mouseenter", () => {
			if (Number(layoutSelect.value) > 0) {
				switchPanel(panel, true);
			}
		});
		panel.addEventListener("mouseleave", () => {
			if (Number(layoutSelect.value) > 0) {
				switchPanel(panel, false);
			}
		});
	}

	// Toggle panel visiblity in full-width layout
	// doShow param used by functions that only either show or hide it
	window.togglePanel = function(doShow) {
		const layoutSelect = document.getElementById("layout-select");
		if (layoutSelect.value !== "0") return;
		const panel = document.querySelector(".page:not(.disabled) .panel");

		// Hide panel
		if (doShow !== true && panel.classList.contains("visible")) {
			panel.classList.remove("visible");
			// -> .on-top removed in handleTransitionEnd()
		}
		// Show panel
		else if (doShow !== false && !panel.classList.contains("visible")) {
			panel.classList.add("on-top");
			panel.classList.add("visible");
			panel.classList.add("expanding");
			panel.classList.add("hover");
		}
	};

	window.setUpPanels = function(pages, layoutSelect) {
		pages.forEach(page => {
			const panel = page.querySelector(".panel");
			addHoverInteractions(panel, layoutSelect);
		});

		// Add doc & window listeners only on first load
		if (setUpPanels.isDone) return;
		setUpPanels.isDone = true;
		document.addEventListener("transitionend", handleTransitionEnd);
	};
})();
