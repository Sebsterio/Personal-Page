// Header buttons click - shift header sideways on icon click (full-width view)
function setUpHeaderButtons() {
	const header = document.getElementById("header");
	const buttons = header.querySelectorAll(".header-btn");
	buttons.forEach(
		btn =>
			(btn.onclick = () => (header.dataset.position = btn.dataset.direction))
	);
}
