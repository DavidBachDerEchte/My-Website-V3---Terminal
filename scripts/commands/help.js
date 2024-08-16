class Help {
	constructor({inputText}) {
		this.inputText = inputText;
		this.help();
	}

	help() {
		const input = document.getElementsByClassName("input")[0];

		const outputhelp = document.createElement('div');
		outputhelp.classList.add('output');
		outputhelp.innerHTML = `<span class="prompt"><span class="white">${this.inputText}: help <br><br>&#9; Display information about builtin commands. <br><br>&#9;Commands: <br><br>&#9;   clear, cls &#9;&#9; clears the terminal</span></span>`
		input.parentNode.parentNode.prepend(outputhelp);
		input.innerText = '';

		const outputDiv = document.createElement('div');
		outputDiv.classList.add('output');
		outputDiv.innerHTML = `<span class="prompt">root@davidbach.eu<span class="white">:</span><span class="blue">~</span><span class="white">$ ${this.inputText}</span></span>`;
		input.parentNode.parentNode.prepend(outputDiv);
	}
}

export {Help}