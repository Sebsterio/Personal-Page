const JS30folders = [
	"01 - JavaScript Drum Kit",
	"02 - JS and CSS Clock",
	"03 - CSS Variables",
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

JS30projects.forEach(project => {
	const link = document.createElement("p");
	link.innerHTML = `<a href=${project.url}>${project.name}</a>`;
	content.appendChild(link);
});
