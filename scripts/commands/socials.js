class Socials {
	constructor({ inputText, historyIndex, rightOrderHistory, username }) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.username = username;
		this.socials();
	}

	socials() {
		const input = document.getElementsByClassName("input")[0];

		const outputDiv = document.createElement('div');
		outputDiv.classList.add('output');
		outputDiv.id = `${this.historyIndex}`;
		outputDiv.innerHTML = `<span class="prompt">${this.username}@davidbach.eu<span class="white">:</span><span class="blue">~</span><span class="white">$ ${this.inputText}</span></span>`;
		input.parentNode.parentNode.prepend(outputDiv);

		const outputhelp = document.createElement('div');
		outputhelp.classList.add('output');
		outputhelp.id = `${this.historyIndex + 1}`;
		outputhelp.innerHTML = `<span class="prompt"><span class="white">Follow me on <a href="https://www.instagram.com/david_foto_official/" target="_blank">Instagram</a>.</span></span>`
		input.parentNode.parentNode.prepend(outputhelp);
		input.innerText = '';

		this.rightOrderHistory.push(outputhelp);
		this.rightOrderHistory.push(outputDiv);
	}
}
export {Socials}