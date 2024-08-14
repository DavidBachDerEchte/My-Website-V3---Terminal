class Clear {
	constructor() {
		this.clear();
	}

	clear() {
		const elements = Array.from(document.querySelectorAll(".output"));

		elements.forEach(element => {
			element.remove();
		});


		document.getElementsByClassName("input")[0].innerText = '';
	}
}

export {Clear};