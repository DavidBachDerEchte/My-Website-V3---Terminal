class Contact {
	constructor({inputText, historyIndex, rightOrderHistory, username}) {
		this.inputText = inputText;
		this.historyIndex = historyIndex;
		this.rightOrderHistory = rightOrderHistory;
		this.username = username;
		this.done = false;
		this.contact();
	}

	contact() {
		const input = document.getElementsByClassName("input")[0];
		input.classList.add('contact');
		let email = '';
		let message = '';
		let nextMessage = false;

		if (this.done === true) {
			return
		}

		if (input.classList.contains('contact')) {
			document.getElementsByClassName("original")[0].firstElementChild.innerHTML = `<span class="prompt">Please enter your Email Address<span class="white">:</span><span class="blue">~</span><span class="white">$</span></span>`;

			if (nextMessage) {

			} else {
				input.addEventListener("input", () => {
					email = input.innerText;
				})
			}


		}

	}
}

export {Contact};
