// ON HEADER CLICK
//toggleOverlays(pages[index], pages[newIndex]);
// function toggleOverlays(prevPage, newPage) {
// 	const currentOverlay = prevPage.querySelector(".overlay");
// 	currentOverlay.style.zIndex = "initial";
// 	currentOverlay.classList.remove("hover");

// 	//remove overlay from current page
// 	setTimeout(() => {
// 		const nextOverlay = newPage.querySelector(".overlay");
// 		nextOverlay.classList.add("hover");
// 	}, 500);
// }

// when .panel fades out, move it behind iframe
function handleTransitionEnd(e) {
	if (
		e.target.classList.contains("panel") &&
		e.propertyName == "opacity" &&
		// fade OUT only
		!e.target.classList.contains("visible")
	) {
		e.target.classList.remove("on-top");
	}
}

function addHoverInteractions(tile, tiles) {
	tile.addEventListener("mouseenter", e => {
		// deactivate all other tiles in case of multi col touch event (no mouseleave event)
		tiles.forEach(tile => {
			if (tile !== e.target) {
				tile.classList.remove("active");
				tile.classList.remove("visible");
			}
		});
		// activate tile hovered over / touched
		tile.classList.add("visible");
		// -> transitionend adds class .active
	});
	// tile.addEventListener("mouseleave", () => {
	// 	tile.classList.remove("active");
	// 	tile.classList.remove("visible");
	// });
}

function setUpPanels(pages, header, layout) {
	pages.forEach(page => {
		/* addHoverInteractions(tile, tiles); */
	});
	document.addEventListener("transitionend", handleTransitionEnd);
	header.onclick = () => {
		if (layout === "0") {
			const panel = document.querySelector(".page:not(.disabled) .panel");
			if (panel.classList.contains("visible")) {
				panel.classList.remove("visible");
				// -> .on-top removed in handleTransitionEnd()
			} else {
				panel.classList.add("on-top");
				panel.classList.add("visible");
			}
		}
	};
}
