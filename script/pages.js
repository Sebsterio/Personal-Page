(function() {
	// Add project tile to container
	function getPage(project) {
		const page = document.createElement("div");
		page.classList.add("page");
		page.dataset.projectName = project.name;

		// Save iframe src to be loaded dynamically on scroll
		const frame = `
			<div class="project">
				<iframe src="" 
					data-src="${project.url}" 
					width="100%" 
					height="100%" 
					frameborder="0"
				>
				<!-- fallback -->
					<a href="${project.url}">${project.name}</a>
				</iframe>
			</div>
		`;

		// .panel-p-main is targeted by transitionend listener to avoid firing multiple times when there are several .panel-p elements
		const panel = `
			<div class="panel">
				<div class="description">
					<div class="description-title">
						<h1>${project.name}</h1>
					</div>
					<div class="description-p description-p-main slide-in-right">
						<p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
					</div>
					<div class="description-p slide-in-left">
						<p>#Lorem #ipsum #cupiditate</p>
					</div>
				</div>
			</div>		
		`;

		page.innerHTML = frame + panel;
		return page;
	}

	// Make an array of .page elements from a list of projects
	window.getPages = function(catalog) {
		return catalog.map(project => {
			return getPage(project);
		});
	};

	// Place pages in the container
	window.renderPages = function(pages, container) {
		for (i = 0; i < pages.length; i++) {
			page = pages[i];
			page.style.zIndex = pages.length - i;
			if (i !== 0) page.classList.add("disabled");

			// alternate iframe and panel positions
			if (i % 2 == 1) {
				const frame = page.querySelector(".project");
				page.appendChild(frame);
			}

			container.appendChild(page);
		}
	};
})();
