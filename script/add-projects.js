// add project tile to container
function getTile(project, { width, height }, fullScreen) {
	const tile = document.createElement("div");
	tile.classList.add("tile");
	// save iframe src to be loaded dynamically on scroll
	tile.innerHTML = `
			<iframe src="" 
			data-src="${project.url}" 
			width="${width}" 
			height="${height}" 
			frameborder="0"
			>
				<!-- fallback -->
				<a href="${project.url}">${project.name}</a>
			</iframe>
			<div class="overlay"}><p>${project.name}</p></div>		
		`;

	return tile;
}

// make an array of tiles from a list of projects
function getProjects(projects, tileSize, fullScreen) {
	return projects.map(project => {
		return getTile(project, tileSize, fullScreen);
	});
}

// append tiles to container
function renderProjects(tiles, container) {
	tiles.forEach(tile => {
		container.appendChild(tile);
	});
}
