import {username} from "./script.js";

document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementsByClassName("input")[0];
	const prompt = document.getElementsByClassName("prompt-tou")[0];
	const terminalBody = document.querySelector('.terminal-body');

	prompt.innerHTML = `<span class="prompt-tou prompt">${username}<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`

	terminalBody.addEventListener('click', () => {
		input.focus();
	})

	let message = '';
	const handleInput = () => {
		message = input.innerText;
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			const newmessage = message.replace(/\s+/g, '').toLowerCase();
			if (newmessage === 'exit') {
				input.removeEventListener('input', handleInput);
				input.removeEventListener('keypress', handleEnter);
				window.location.href = '../index.html';
			} else {
				const outputDiv = document.createElement('div');
				outputDiv.classList.add('output');
				outputDiv.innerHTML = `<span class="prompt"><span class="white">Type 'exit' to go back.</span></span>`;
				input.parentNode.parentNode.append(outputDiv);
				input.innerText = '';
				document.querySelector('.terminal-body').scrollTo(0, 100000);
			}
		}
	};

	input.addEventListener('input', handleInput);
	input.addEventListener('keypress', handleEnter);
})



