// import JS30projects
// import addProjects (projectsArray, targetContainer, targetNav, iframeSize)

const content = document.getElementById("content");
const list = document.getElementById("list");
const windowSize = {
	width:
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth,
	height:
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight
};
const tileSize = {
	width: (function(w) {
		return w.width > 600 ? 600 : w.width;
	})(windowSize),
	height: (function(w) {
		return w.height > 600 ? 600 : w.height;
	})(windowSize)
};

addProjects(JS30projects, content, list, tileSize);

window.addEventListener("resize", () => {
	// debounce not needed as iframe containers load before their content, so the resize is smooth
	list.innerHTML = "";
	content.innerHTML = "";
	addProjects(JS30projects, content, list, tileSize);
});
