(function() {
	function handleTransitionEnd(e) {
		// when .panel faded out, move it behind iframe
		if (
			e.propertyName == "opacity" &&
			e.target.classList.contains("panel") &&
			!e.target.classList.contains("visible")
		) {
			e.target.classList.remove("on-top");
			expanding = false;
			e.target.classList.remove("expanded");
		}
		// when .description appeared, show p
		else if (
			e.propertyName === "flex-grow" &&
			e.target.classList.contains("description")
		) {
			if (expanding) e.target.parentElement.classList.add("expanded");
			// handle abort (mouseleave)
			else e.target.parentElement.classList.remove("hover");
		}
		// when p dissapeard, hide .description
		else if (
			e.propertyName === "transform" &&
			e.target.classList.contains("description")
		) {
			if (!expanding) e.target.parentElement.classList.remove("hover");
			// handle abort (mouseenter)
			else e.target.parentElement.classList.add("expanded");
		}
	}

	// display detailed description on panel hover
	let expanding = false;
	function addHoverInteractions(panel, layoutSelect) {
		panel.addEventListener("mouseenter", e => {
			if (Number(layoutSelect.value) > 0) {
				expanding = true;
				panel.classList.add("hover");
				// -> transitionend adds class .expanded
			}
		});
		panel.addEventListener("mouseleave", e => {
			if (Number(layoutSelect.value) > 0) {
				expanding = false;
				panel.classList.remove("expanded");

				// -> transitionend removes class .hover
			}
		});
	}

	// toggle panel visiblity on header click in full-width layout
	function handleHeaderClick(layoutSelect) {
		if (layoutSelect.value === "0") {
			const panel = document.querySelector(".page:not(.disabled) .panel");
			if (panel.classList.contains("visible")) {
				panel.classList.remove("visible");
				// -> .on-top removed in handleTransitionEnd()
			} else {
				panel.classList.add("on-top");
				panel.classList.add("visible");
				expanding = true;
				panel.classList.add("hover");
			}
		}
	}
	window.setUpPanels = function(pages, header, layoutSelect) {
		pages.forEach(page => {
			const panel = page.querySelector(".panel");
			addHoverInteractions(panel, layoutSelect);
		});

		// avoid adding multiple identical listeners by loadDoc()
		if (setUpPanels.isDone) return;
		setUpPanels.isDone = true;

		document.addEventListener("transitionend", handleTransitionEnd);
		header.addEventListener("click", () => handleHeaderClick(layoutSelect));
	};
})();
