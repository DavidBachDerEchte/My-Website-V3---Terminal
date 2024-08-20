class Gallery {
	constructor({inputText, historyIndex, rightOrderHistory, username}) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.username = username;
		this.gallery();
	}

	async gallery() {
		const input = document.getElementsByClassName("input")[0];

		// Create output for gallery command
		const outputDiv = document.createElement('div');
		outputDiv.classList.add('output');
		outputDiv.id = `${this.historyIndex}`;
		outputDiv.innerHTML = `<span class="prompt">${this.username}@davidbach.eu<span class="white">:</span><span class="blue">~</span><span class="white">$ ${this.inputText}</span></span>`;
		input.parentNode.parentNode.prepend(outputDiv);

		// Fetch images from server
		const response = await fetch('/api/gallery');
		const images = await response.json();

		// Create gallery container
		const galleryDiv = document.createElement('div');
		galleryDiv.classList.add('gallery');

		// Populate gallery with images
		images.forEach((image, index) => {
			const imgElement = document.createElement('img');
			imgElement.src = image;
			imgElement.alt = `Gallery image ${index + 1}`;
			galleryDiv.appendChild(imgElement);
		});

		input.parentNode.parentNode.prepend(galleryDiv);
		input.innerText = '';

		this.rightOrderHistory.push(galleryDiv);
		this.rightOrderHistory.push(outputDiv);
	}
}

export { Gallery };
