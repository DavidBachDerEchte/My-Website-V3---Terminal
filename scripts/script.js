import {Clear} from "./commands/clear.js";
import {Help} from "./commands/help.js";
import {Info} from "./commands/info.js";
import {Contact} from "./commands/contact.js";
import {Error} from "./error.js";
import {Socials} from "./commands/socials.js";

let commandHistory = [];
let rightOrderHistory = [];
let historyIndex = -1;
const username = `user@${window.location.hostname}`;

document.addEventListener("DOMContentLoaded", () => {
	const inputElement = document.querySelector('.input');
	const prompt = document.getElementsByClassName("prompt-main")[0];
	prompt.innerHTML = `<span class="prompt prompt-main">${username}<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`

	document.getElementsByClassName("terminal-body")[0].addEventListener("click", () => {
		document.getElementsByClassName("input")[0].focus();
	})

	if (!document.cookie.includes("firstVisit")) {
		const userResponse = confirm("Welcome to our website!\n\nBy clicking 'OK', you agree that we use Google reCAPTCHA for security purposes and collect cookies to enhance your experience. You also accept that you can send us a contact request via email using the 'contact' command. Your information will not be stored; we will only receive an email with your message.\n\nTo see a list of available commands, type 'help'.\n\nDo you accept the terms?");

		if (userResponse) {
			document.cookie = "firstVisit=true,expires=Fri, 31 Dec 9999 23:59:59 GMT";
		} else {
			window.location.href = 'https://www.google.com';
		}
	}

	inputElement.addEventListener('keypress', function (e) {

		if (e.key === 'Enter') {
			e.preventDefault();

			const inputText = this.innerText.replace(/\s+/g, '');
			const inputSwitch = inputText.toLowerCase();

			if (inputText) {
				commandHistory.push(inputText);
				historyIndex = rightOrderHistory.length;
			}
			if (!inputElement.hasAttribute('contact')) {

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
					case 'termsofuse':
						window.location.href = '../terms-of-use.html';
						break;
					default:
						new Error({inputText, historyIndex, rightOrderHistory});
						break;
				}
				this.innerText = '';
			}

			const output = document.querySelectorAll('.output');
			const outputArray = Array.from(output);
			outputArray.sort((a, b) => {
				return parseInt(b.id) - parseInt(a.id);
			});
			const terminalBody = document.querySelector('.terminal-body');
			outputArray.forEach(output => terminalBody.prepend(output));
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

export {username};
