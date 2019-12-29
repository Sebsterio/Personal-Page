(function() {
	function getPage(project) {
		const page = document.createElement("div");
		page.classList.add("page");
		page.dataset.frame = `
			<iframe src="" 
				data-src="${project.url}" 
				width="0" 
				height="0" 
				frameborder="0"
			>
				<!-- fallback -->
				<a href="${project.url}">${project.name}</a>
			</iframe>
		`;
		page.dataset.panel = `<div class="panel"><p>${project.name}</p></div>`;
		return page;
	}

	// Make an array of pages from a list of projects
	window.getPages = function(catalog) {
		return catalog.map(project => {
			return getPage(project);
		});
	};

	// Place pages in the container
	window.renderPages = function(pages, container) {
		for (i = 0; i < pages.length; i++) {
			page = pages[i];
			// alternate iframe and panel positions
			const frame = page.dataset.frame;
			const panel = page.dataset.panel;
			if (i % 2 == 0) {
				page.innerHTML = frame + panel;
			} else {
				page.innerHTML = panel + frame;
			}

			if (i !== 0) page.classList.add("closed");
			// TODO: rename the below
			// page.classList.add("visible");
			// page.classList.add("active");
			page.style.zIndex = pages.length - i;

			container.appendChild(page);
		}
	};
})();
