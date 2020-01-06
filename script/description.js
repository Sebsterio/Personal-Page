function handleDescriptionTransitionEnd(e) {
	// When .description-title moved up, show .description-p
	if (
		e.propertyName === "flex-shrink" &&
		e.target.classList.contains("description-title")
	) {
		if (e.target.parentElement.classList.contains("expanding"))
			e.target.parentElement.classList.add("expanded");
		// handle abort (mouseleave)
		else e.target.parentElement.classList.remove("hover");
	}
	// When .description-p dissapeard, move .description-title back to center
	else if (
		e.propertyName === "transform" &&
		e.target.classList.contains("description-p-main")
	) {
		if (!e.target.parentElement.classList.contains("expanding"))
			e.target.parentElement.classList.remove("hover");
		// handle abort (mouseenter)
		else e.target.parentElement.classList.add("expanded");
	}
}

function toggleDescription(description, activate) {
	if (activate) {
		description.classList.add("expanding");
		description.classList.add("hover");
		// -> transitionend adds class .expanded
	} else {
		description.classList.remove("expanding");
		description.classList.remove("expanded");
		// -> transitionend removes class .hover
	}
}

// Show panel description on hover in split-view layout
// Didn't use CSS because the sequene of transitions must be reversed on mouseout
window.setUplDescriptionHover = function() {
	const descs = document.querySelectorAll(".description");
	const layoutSelect = document.getElementById("layout-select");
	descs.forEach(desc => {
		desc.addEventListener("mouseenter", e => {
			if (Number(layoutSelect.value) > 0) toggleDescription(desc, true);
		});
		desc.addEventListener("mouseleave", e => {
			if (Number(layoutSelect.value) > 0) toggleDescription(desc, false);
		});
	});

	if (setUplDescriptionHover.isDone) return;
	setUplDescriptionHover.isDone = true;
	document.addEventListener("transitionend", handleDescriptionTransitionEnd);
};
