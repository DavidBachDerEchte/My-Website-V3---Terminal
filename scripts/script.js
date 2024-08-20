import {Clear} from "./commands/clear.js";
import {Help} from "./commands/help.js";
import {Info} from "./commands/info.js";
import {Contact} from "./commands/contact.js";
import {Error} from "./error.js";
import {Socials} from "./commands/socials.js";
import {Gallery} from "./commands/gallery.js";

const commands = ['clear', 'cls', 'help', 'info', 'contact', 'socials', 'gallery'];
let commandHistory = [];
let rightOrderHistory = [];
let historyIndex = -1;
const username = 'user';

document.addEventListener("DOMContentLoaded", () => {
	const inputElement = document.querySelector('.input');

	document.getElementsByClassName("terminal-body")[0].addEventListener("click", () => {
		document.getElementsByClassName("input")[0].focus();
	})
	if (!inputElement.hasAttribute('contact')) {

	inputElement.addEventListener('keypress', function (e) {

		if (e.key === 'Enter') {
			e.preventDefault();

			const inputText = this.innerText.trim();
			const inputSwitch = inputText.toLowerCase();

			if (inputText) {
				commandHistory.push(inputText);
				historyIndex = rightOrderHistory.length;
			}
				switch (inputSwitch) {
					case 'clear':
					case 'cls':
						new Clear();
						break;
					case 'help':
						new Help({inputText, historyIndex, rightOrderHistory, username});
						break;
					case 'info':
						new Info({inputText, historyIndex, rightOrderHistory, username});
						break;
					case 'contact':
						new Contact({inputText, historyIndex, rightOrderHistory, username});
						break;
					case 'socials':
						new Socials({inputText, historyIndex, rightOrderHistory, username});
						break;
					case 'gallery':
						new Gallery({inputText, historyIndex, rightOrderHistory, username});
						break;
					default:
						new Error({inputText, historyIndex, rightOrderHistory});
						break;
				}
				this.innerText = '';

				const output = document.querySelectorAll('.output');
				const outputArray = Array.from(output);
				outputArray.sort((a, b) => {
					return parseInt(b.id) - parseInt(a.id);
				});
				const terminalBody = document.querySelector('.terminal-body');
				outputArray.forEach(output => terminalBody.prepend(output));
		}
	});
	}

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

	document.getElementsByClassName("close")[0].addEventListener("click", () => {
		window.close();
	})
});
