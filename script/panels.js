(function() {
	function handleTransitionEnd(e) {
		// When .panel faded out, move it behind iframe
		if (
			e.propertyName == "opacity" &&
			e.target.classList.contains("panel") &&
			!e.target.classList.contains("visible")
		) {
			e.target.classList.remove("on-top");
			e.target.classList.remove("expanding");
			e.target.classList.remove("expanded");
		}
		// When .description appeared, show p
		else if (
			e.propertyName === "flex-grow" &&
			e.target.classList.contains("description")
		) {
			if (e.target.parentElement.classList.contains("expanding"))
				e.target.parentElement.classList.add("expanded");
			// handle abort (mouseleave)
			else e.target.parentElement.classList.remove("hover");
		}
		// When p dissapeard, hide .description
		else if (
			e.propertyName === "transform" &&
			e.target.classList.contains("description")
		) {
			if (!e.target.parentElement.classList.contains("expanding"))
				e.target.parentElement.classList.remove("hover");
			// handle abort (mouseenter)
			else e.target.parentElement.classList.add("expanded");
		}
	}

	// display detailed description on panel hover
	//let expanding = false;
	function addHoverInteractions(panel, layoutSelect) {
		panel.addEventListener("mouseenter", e => {
			if (Number(layoutSelect.value) > 0) {
				panel.classList.add("expanding");
				panel.classList.add("hover");
				// -> transitionend adds class .expanded
			}
		});
		panel.addEventListener("mouseleave", e => {
			if (Number(layoutSelect.value) > 0) {
				panel.classList.remove("expanding");
				panel.classList.remove("expanded");

				// -> transitionend removes class .hover
			}
		});
	}

	// toggle panel visiblity on header click in full-width layout
	function handleBarclick(layoutSelect) {
		if (layoutSelect.value === "0") {
			const panel = document.querySelector(".page:not(.disabled) .panel");
			if (panel.classList.contains("visible")) {
				panel.classList.remove("visible");
				// -> .on-top removed in handleTransitionEnd()
			} else {
				panel.classList.add("on-top");
				panel.classList.add("visible");
				panel.classList.add("expanding");
				panel.classList.add("hover");
			}
		}
	}
	window.setUpPanels = function(pages, bar, layoutSelect) {
		pages.forEach(page => {
			const panel = page.querySelector(".panel");
			addHoverInteractions(panel, layoutSelect);
		});

		// avoid adding multiple identical listeners by loadDoc()
		if (setUpPanels.isDone) return;
		setUpPanels.isDone = true;

		document.addEventListener("transitionend", handleTransitionEnd);
		bar.addEventListener("click", () => handleBarclick(layoutSelect));
	};
})();
