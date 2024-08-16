import {Clear} from "./commands/clear.js";
import {Help} from "./commands/help.js";

const commands = ['clear', 'cls', 'help'];
let commandHistory = [];
let historyIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
	const inputElement = document.querySelector('.input');

	inputElement.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			e.preventDefault();

			const inputText = this.innerText.trim();

			if (inputText) {
				commandHistory.push(inputText);
				historyIndex = commandHistory.length;
			}

			if (commands.includes(inputText)) {
				switch (inputText) {
					case 'clear':
					case 'cls':
						new Clear();
						break;
					case 'help':
						new Help({inputText});
						break;
				}
				this.innerText = '';
			} else {
				const outputDiv = document.createElement('div');
				outputDiv.classList.add('output');
				outputDiv.innerHTML = `<span class="prompt"><span class="white">${inputText}: command not found</span></span>`;
				this.parentElement.parentElement.insertBefore(outputDiv, this);
				console.log(this);
				this.innerText = '';
			}
		}
	});

	inputElement.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				this.innerText = commandHistory[historyIndex] || '';
			}
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				this.innerText = commandHistory[historyIndex] || '';
			} else {
				historyIndex = commandHistory.length;
				this.innerText = '';
			}
		}
	});
});
