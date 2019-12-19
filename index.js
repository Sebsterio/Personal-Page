// import JS30projects
// import addProjects (projectsArray, targetContainer, targetNav, iframeSize)

function updateWindowSize() {
	return {
		width:
			window.innerWidth ||
			document.documentElement.clientWidth ||
			document.body.clientWidth,
		height:
			window.innerHeight ||
			document.documentElement.clientHeight ||
			document.body.clientHeight
	};
}

// fit tile to screen if screen.width < max
// else, tileSize = max
function updateTileSize({ width, height }, max) {
	return width > max
		? {
				width: max,
				height: max
		  }
		: {
				width,
				height
		  };
}

function loadDoc() {
	const content = document.getElementById("content");
	const list = document.getElementById("list");

	let tileSize = updateTileSize(updateWindowSize(), 600);

	list.innerHTML = "";
	content.innerHTML = "";
	addProjects(JS30projects, content, list, tileSize);
}

// debounce not needed as iframe containers load before their content, so event re-fires before iframe scripts load
window.addEventListener("resize", loadDoc);

loadDoc();
