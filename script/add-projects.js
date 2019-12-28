// add project tile to container
function getPage(project) {
	const page = document.createElement("div");
	page.classList.add("page");
	// save iframe src to be loaded dynamically on scroll
	page.innerHTML = `
			<iframe src="" 
			data-src="${project.url}" 
			width="0" 
			height="0" 
			frameborder="0"
			>
				<!-- fallback -->
				<a href="${project.url}">${project.name}</a>
			</iframe>
			<div class="panel"><p>${project.name}</p></div>		
		`;

	return page;
}

// make an array of pages from a list of projects
function getPages(catalog) {
	return catalog.map(project => {
		return getPage(project);
	});
}

// append pages to container
function renderPages(pages, container) {
	pages.forEach(tile => {
		container.appendChild(tile);
	});
}
