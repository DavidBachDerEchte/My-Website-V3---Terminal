document.addEventListener('DOMContentLoaded', () => {
	const input = document.getElementsByClassName("input")[0];
	const prompt = document.getElementsByClassName("prompt-tou")[0];
	const terminalBody = document.querySelector('.terminal-body');


	document.querySelector('.terminal-body').scrollTo(0, 0);

	prompt.innerHTML = `<span class="prompt-tou prompt">user@${window.location.hostname}<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`

	terminalBody.addEventListener('click', () => {
		input.focus();
	})

	let message = '';
	const handleInput = () => {
		message = input.innerText;
	};

	let firstagree = false;
	const handleEnter = (e) => {

		if (e.key === 'Enter') {
			e.preventDefault();
			const newmessage = message.replace(/\s+/g, '').toLowerCase();
			if (newmessage === 'exit') {
				const outputDiv = document.createElement('div');
				outputDiv.classList.add('output');
				outputDiv.innerHTML = `<span class="prompt"><span class="white">Are you Sure? If you type 'yes' you will automatically accept the privacy policy & cookies.</span></span>`;
				input.parentNode.parentNode.append(outputDiv);
				input.innerText = '';
				document.querySelector('.terminal-body').scrollTo(0, 100000);
				firstagree = true;
			} else if (firstagree) {
				if (newmessage === 'yes') {
					input.removeEventListener('input', handleInput);
					input.removeEventListener('keypress', handleEnter);
					document.cookie = "firstVisit=true,expires=Fri, 31 Dec 9999 23:59:59 GMT";
					window.location.href = '../index.html';
				} else {
					window.location.href = 'https://www.google.com/';
				}
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



