import { apiServer } from "../config.js";

class Contact {
	email = '';
	message = '';
	RECAPTCHA_SITE_KEY = "6LeyXAopAAAAAMPTxLkX673Q0qfB3-DhT_Ot0sBB";
	constructor({ inputText, historyIndex, rightOrderHistory, username }) {
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
					} else if (email.replace(/\s+/g, '').toLowerCase() === 'exit') {
						input.removeEventListener('input', handleInput);
						input.removeEventListener('keypress', handleKeyPress);
						window.location.href = './terminal.html';
					} else {
						const outputDiv = document.createElement('div');
						outputDiv.classList.add('output');
						outputDiv.id = `${this.historyIndex}`;
						outputDiv.innerHTML = `<span class="prompt"><span class="white">Please enter a valid Email address</span></span>`;
						input.parentNode.parentNode.prepend(outputDiv);
						this.rightOrderHistory.push(outputDiv);
						input.innerText = '';
					}
				} else if (message.replace(/\s+/g, '').toLowerCase() === 'exit') {
					input.removeEventListener('input', handleInput);
					input.removeEventListener('keypress', handleKeyPress);
					window.location.href = './terminal.html';
				} else {
					// When the message is complete
					input.innerText = '';
					document.getElementsByClassName("original")[0].firstElementChild.innerHTML = `<span class="prompt">${this.username}<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`;
					input.removeAttribute('contact');

					// Update the class properties
					this.email = email;
					this.message = message;

					grecaptcha.ready(() => {
						grecaptcha
						.execute(this.RECAPTCHA_SITE_KEY, {action: "submit"})
						.then((token) => {
							// Call your server with the captcha token
							this.sendCaptcha(token, this.email, this.message); //, emailInput, messageInput)
						});
					});

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

	sendCaptcha = (token, emailInput, messageInput) => {
		fetch(`${apiServer}/recaptcha`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token,
			}),
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to send CAPTCHA: ${response.statusText}`);
			}
			return response.json(); // Assuming the server responds with JSON
		})
		.then((data) => {
			// Handle the server response here
			if (data.success) {
				// If the server indicates success, call handleClick
				this.sendMail(emailInput, messageInput);
			} else {
				// Handle other cases as needed
				throw new Error("CAPTCHA validation failed on the server.", "danger");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
			throw new Error(
				"An error occurred while verifying CAPTCHA. Please try again later.",
				"danger",
			);
		});
	};

	sendMail = (email, message) => {
		fetch(`${apiServer}/send-email`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,  // Ensure correct property names
				message: message,  // Ensure correct property names
			}),
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Failed to send email: ${response.statusText}`);
			}
			return response.text();
		})
		.then((data) => {
			console.log(data);
		})
		.catch((error) => {
			console.error("Error:", error);
		});
	};
}

export { Contact };
