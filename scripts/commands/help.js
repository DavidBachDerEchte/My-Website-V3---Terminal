class Help {
	constructor({inputText, historyIndex, rightOrderHistory, username}) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.username = username;
		this.help();
	}

	help() {
		const input = document.getElementsByClassName("input")[0];

		const outputDiv = document.createElement('div');
		outputDiv.classList.add('output');
		outputDiv.id = `${this.historyIndex}`;
		outputDiv.innerHTML = `<span class="prompt">${this.username}<span class="white">:</span><span class="blue">~</span><span class="white">$ ${this.inputText}</span></span>`;
		input.parentNode.parentNode.prepend(outputDiv);

		const outputhelp = document.createElement('div');
		outputhelp.classList.add('output');
		outputhelp.id = `${this.historyIndex + 1}`;
		outputhelp.innerHTML = `<span class="prompt"><span class="white">${this.inputText}: help <br><br>&#9; Display information about builtin commands. <br><br>&#9;Commands: <br><br>&#9;   clear, cls &#9;&#9; clears the terminal <br><br>&#9;   info &#9;&#9; displays information about the creator of this Website. <br><br>&#9;   contact &#9;&#9; you can send the creator of this website an Email. <br><br>&#9;   socials &#9;&#9; here you find my Instagram.<br><br>&#9;   terms of use &#9;&#9; here you find the Terms of Use Page of this Website.</span></span>`
		input.parentNode.parentNode.prepend(outputhelp);
		input.innerText = '';

		this.rightOrderHistory.push(outputhelp);
		this.rightOrderHistory.push(outputDiv);
	}
}

export {Help}