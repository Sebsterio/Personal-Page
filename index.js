const JS30folders = [
	"01 - JavaScript Drum Kit",
	"02 - JS and CSS Clock",
	"03 - CSS Variables",
	"05 - Flex Panel Gallery",
	"06 - Type Ahead",
	"08 - Fun with HTML5 Canvas",
	"10 - Hold Shift and Check Checkboxes",
	"12 - Key Sequence Detection",
	"13 - Slide in on Scroll",
	"16 - Mouse Move Shadow"
];

const JS30projects = JS30folders.map(folder => ({
	name: folder,
	url:
		"https://sebsterio.github.io/JavaScript30/" +
		folder.replace(/ /g, "%20") +
		"/index.html"
}));

const content = document.getElementById("content");
const list = document.getElementById("list");

// populate #list with links and #content with iframes
JS30projects.forEach(project => {
	const link = document.createElement("div");
	link.innerHTML = `<li><a href=${project.url}>${project.name}</a></li>`;
	list.appendChild(link);

	const tile = document.createElement("div");
	tile.innerHTML = `<div class="tile"><iframe src="${project.url}" frameborder="0"></iframe>
	<div class="overlay"><p>${project.name}</p></div></div>`;
	content.appendChild(tile);
});

// iframe overlays fade out on hover

const tiles = document.querySelectorAll(".tile");

tiles.forEach(tile => {
	// on .tile hover, fade out .tile-overlay bg
	tile.addEventListener("mouseenter", () => {
		const overlay = tile.querySelector(".overlay");
		overlay.classList.add("hover");
	});
	// on .tile mouseleave, move .overlay in front iframe and fade-in
	tile.addEventListener("mouseleave", () => {
		const overlay = tile.querySelector(".overlay");
		overlay.style.zIndex = "initial";
		overlay.classList.remove("hover");
	});
});

window.addEventListener("transitionend", e => {
	// when .overlay fades out, move it behind iframe
	if (e.target.classList.contains("overlay") && e.propertyName == "opacity") {
		if (e.target.classList.contains("hover")) {
			e.target.style.zIndex = -1;
		}
	}
});
