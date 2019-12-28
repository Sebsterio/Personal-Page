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

// when .overlay fades out, move it behind iframe
function handleTransitionEnd(e) {
	if (
		e.target.classList.contains("overlay") &&
		e.propertyName == "opacity" &&
		// fade OUT only
		e.target.parentElement.classList.contains("visible")
	) {
		e.target.parentElement.classList.add("active");
	}
}

function setUpOverlays(tiles, wideLayout) {
	if (wideLayout) {
		tiles.forEach(tile => {
			addHoverInteractions(tile, tiles);
		});
		window.addEventListener("transitionend", handleTransitionEnd);
	}
}
