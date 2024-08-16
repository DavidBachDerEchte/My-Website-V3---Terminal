class Error {
	constructor({inputText, historyIndex, rightOrderHistory}) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.info();
	}

	info() {
		const input = document.getElementsByClassName("input")[0];

		const outputDiv = document.createElement('div');
		outputDiv.classList.add('output');
		outputDiv.id = `${this.historyIndex}`;
		outputDiv.innerHTML = `<span class="prompt"><span class="white">${this.inputText}: command not found</span></span>`;
		input.parentNode.parentNode.prepend(outputDiv);
		this.rightOrderHistory.push(outputDiv);
		input.innerText = '';
	}
}

export { Error }