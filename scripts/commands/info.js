class Info {
	constructor({inputText, historyIndex, rightOrderHistory, username}) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.username = username;
		this.info();
	}

	info() {
		const input = document.getElementsByClassName("input")[0];

		const outputDiv = document.createElement('div');
		outputDiv.classList.add('output');
		outputDiv.id = `${this.historyIndex}`;
		outputDiv.innerHTML = `<span class="prompt">${this.username}<span class="white">:</span><span class="blue">~</span><span class="white">$ ${this.inputText}</span></span>`;
		input.parentNode.parentNode.prepend(outputDiv);

		const outputhelp = document.createElement('div');
		outputhelp.classList.add('output');
		outputhelp.id = `${this.historyIndex + 1}`;
		outputhelp.innerHTML = `<span class="prompt"><span class="white">Hi, I'm David Bach. I'm a Trainee at <a href="https://www.medienpalast.net/" target="_blank">Medienpalast</a> Kempten. My passion is coding and astronomy. If you have any questions, feel free to contact me.</span></span>`
		input.parentNode.parentNode.prepend(outputhelp);
		input.innerText = '';

		this.rightOrderHistory.push(outputhelp);
		this.rightOrderHistory.push(outputDiv);
	}
}

export { Info }