import {username} from "./script.js";

document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementsByClassName("input")[0];
	const prompt = document.getElementsByClassName("prompt-tou")[0];

	prompt.innerHTML = `<span class="prompt-tou prompt">${username}@davidbach.eu<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`


	let message = '';
	const handleInput = () => {
		message = input.innerText;
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			const newmessage = message.replace(/\s+/g, '').toLowerCase();
			if (newmessage === 'exit') {
				input.removeEventListener('input', handleInput);
				input.removeEventListener('keypress', handleEnter);
				window.location.href = '../terminal.html';
			}
		}
	};

	input.addEventListener('input', handleInput);
	input.addEventListener('keypress', handleEnter);
})



