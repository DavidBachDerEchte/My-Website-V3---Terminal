class Contact {
	constructor({inputText, historyIndex, rightOrderHistory, username}) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.username = username;
		this.contact();
	}

	contact() {
		const input = document.getElementsByClassName("input")[0];
		input.setAttribute('contact', 'true');
		let email = '';
		let message = '';
		let nextMessage = false;

		const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		const handleInput = (e) => {
			if (!nextMessage) {
				email = input.innerText;
			} else {
				message = input.innerText;
			}
		};

		const handleKeyPress = (e) => {
			if (e.key === 'Enter') {
				if (!nextMessage) {
					if (emailpattern.test(email)) {
						input.innerText = '';
						nextMessage = true;
						document.getElementsByClassName("original")[0].firstElementChild.innerHTML = `<span class="prompt">Please enter the Message<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`;
					} else {
						const outputDiv = document.createElement('div');
						outputDiv.classList.add('output');
						outputDiv.id = `${this.historyIndex}`;
						outputDiv.innerHTML = `<span class="prompt"><span class="white">Please enter a valid Email address</span></span>`;
						input.parentNode.parentNode.prepend(outputDiv);
						this.rightOrderHistory.push(outputDiv);
						input.innerText = '';
					}
				} else {
					// When the message is complete

					// TODO: Fetch to Server to send the Email.
					console.log("Email " + email);
					console.log("Message " + message);

					input.innerText = '';
					document.getElementsByClassName("original")[0].firstElementChild.innerHTML = `<span class="prompt">${this.username}@davidbach.eu<span class="white">:</span><span class="blue">~</span><span class="white">$ </span></span>`;
					input.removeAttribute('contact');

					// Remove event listeners after the message is complete
					input.removeEventListener('input', handleInput);
					input.removeEventListener('keypress', handleKeyPress);
				}
			}
		};

		if (input.hasAttribute('contact')) {
			document.getElementsByClassName("original")[0].firstElementChild.innerHTML = `<span class="prompt">Please enter your Email Address<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`;

			input.addEventListener("input", handleInput);
			input.addEventListener("keypress", handleKeyPress);
		}
	}
}

export {Contact};
