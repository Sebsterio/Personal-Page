function addHoverInteractions(tile, tiles) {
	tile.addEventListener("mouseenter", () => {
		// deactivate all tiles in case of multi col touch event (no mouseleave event)
		tiles.forEach(tile => {
			tile.classList.remove("active");
			tile.classList.remove("visible");
		});

		// activate tile on hover
		tile.classList.add("visible");
		// -> transitionend adds class .active
	});
	tile.addEventListener("mouseleave", () => {
		tile.classList.remove("active");
		tile.classList.remove("visible");
	});
}

// when .overlay fades out, move it behind iframe
function handleTransitionEnd(e) {
	console.log(e.target.parentElement);
	if (
		e.target.classList.contains("overlay") &&
		e.propertyName == "opacity" &&
		// fade OUT only
		e.target.parentElement.classList.contains("visible")
	) {
		e.target.parentElement.classList.add("active");
	}
}

function setUpOverlays(tiles, fullScreen) {
	// all tiles start inactive

	// full screen, tiles start with overlays hidden (tile.visible -> overlay.zIndex = -1)
	if (fullScreen) {
		tiles.forEach(tile => {
			tile.classList.add("visible");
		});
	}

	// in wide screen, tiles start with overlay visible
	// overlay fades in and out on .tile hover
	if (!fullScreen) {
		tiles.forEach(tile => {
			addHoverInteractions(tile, tiles);
		});

		window.addEventListener("transitionend", handleTransitionEnd);
	}
}
