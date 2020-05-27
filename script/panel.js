(function () {
	function handlePanelTransitionEnd(e) {
		// When .panel slid out, move it behind iframe
		// legacy - originally it faded-out so had to be moved in z axis; keeping the code for now)
		if (
			e.propertyName == "transform" &&
			e.target.classList.contains("panel") &&
			!e.target.classList.contains("visible")
		) {
			e.target.classList.remove("on-top");
			const description = e.target.querySelector(".description");
			toggleDescription(description, false);
		}
	}

	// Toggle panel visiblity in full-width layout
	// @param doShow - used by functions that only either show or hide it
	window.togglePanel = function (doShow) {
		const layoutSelect = document.getElementById("layout-select");
		if (layoutSelect.value !== "0") return;

		const panel = document.querySelector(".page:not(.disabled) .panel");
		const description = panel.querySelector(".description");

		// Hide panel
		if (doShow !== true && panel.classList.contains("visible")) {
			panel.classList.remove("visible");
			// -> .on-top removed in handleTransitionEnd()
		}
		// Show panel
		else if (doShow !== false && !panel.classList.contains("visible")) {
			panel.classList.add("on-top");
			panel.classList.add("visible");
			toggleDescription(description, true);
		}
	};

	window.setUpPanels = function (pages) {
		// Main bar click - toggle panel (full-width only)
		document.querySelector(".toggle-panel").onclick = () => togglePanel(null);

		document.addEventListener("transitionend", handlePanelTransitionEnd);
	};
})();
