const input = document.getElementsByClassName("input")[0];
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