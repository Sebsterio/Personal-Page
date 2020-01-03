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

const JS30projects = JS30folders.map(folderName => ({
	name: folderName.replace(/^\d\d - /, ""),
	url:
		"https://sebsterio.github.io/JavaScript30/" +
		folderName.replace(/ /g, "%20") +
		"/index.html"
}));

const home = [
	{
		name: "Home",
		url: "../home.html"
	}
];

// "navLink": "catalog"
const Library = {
	//home: ["Home", home], // <-------TODO: fix
	home: ["Widgets", JS30projects],
	featured: null,
	widgets: ["Widgets", JS30projects]
};
