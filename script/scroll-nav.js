(function () {
	const list = document.querySelector(".nav-list");

	function getNavItem(project, i) {
		const item = document.createElement("li");
		item.classList.add("scroll-btn");
		if (i === 0) item.classList.add("active");
		item.dataset.target = project.name;

		return item;
	}

	window.getNavItems = function (catalog) {
		return catalog.map((project, i) => {
			return getNavItem(project, i);
		});
	};

	window.renderNavItems = function (navItems) {
		return navItems.map((project) => {
			list.appendChild(project);
		});
	};

	window.activateNavItem = function (itemToActivate) {
		navItems.forEach((item) => {
			if (item === itemToActivate) item.classList.add("active");
			else item.classList.remove("active");
		});
	};
})();
