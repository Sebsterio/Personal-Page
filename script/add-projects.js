(function(global) {
	// add project link to nav
	function addLink(project, nav) {
		const link = document.createElement("li");
		link.innerHTML = `<a href=${project.url}>${project.name}</a>`;
		nav.appendChild(link);
	}

	// .overlay fades in and out on .tile hover
	function addHoverInteractions(tile) {
		tile.addEventListener("mouseenter", () => {
			tile.querySelector(".overlay").classList.add("hover");
			// transitionend moves overlay behind iframe
		});
		tile.addEventListener("mouseleave", () => {
			const overlay = tile.querySelector(".overlay");
			overlay.style.zIndex = "initial";
			overlay.classList.remove("hover");
		});
	}

	// add project tile to container
	function addTile(project, container, { width, height }) {
		const tile = document.createElement("article");
		tile.classList.add("tile");
		// save iframe src to be loaded once all tiles rendered
		tile.innerHTML = `
			<iframe src="" 
			data-src="${project.url}" 
			width="${width}" 
			height="${height}" 
			frameborder="0">
				<!-- fallback -->
				<a href="${project.url}">${project.name}</a>
			</iframe>
			<div class="overlay"><p>${project.name}</p></div>
		`;
		addHoverInteractions(tile);
		container.appendChild(tile);
	}

	// when .overlay fades out, move it behind iframe
	function handleTransitionEnd(e) {
		if (
			e.target.classList.contains("overlay") &&
			e.propertyName == "opacity" &&
			// fade OUT only
			e.target.classList.contains("hover")
		) {
			e.target.style.zIndex = -1;
		}
	}

	// load iframes once all tiles rendered
	function loadIFrames(container) {
		const iframes = container.querySelectorAll("iframe");
		iframes.forEach(iframe => (iframe.src = iframe.dataset.src));
	}

	// export addProjects to global namespace
	global.addProjects = function(projects, container, nav, tileSize) {
		projects.forEach(project => {
			addLink(project, nav);
			addTile(project, container, tileSize);
		});
		window.addEventListener("transitionend", handleTransitionEnd);
		loadIFrames(container);
	};
})(window);
