const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log('Number:', randomNum);

window.SpeechRecognition = 
	window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.start();

function onSpeack(e) {
	console.log(e);
	const msg = e.results[0][0].transcript;
	writeMessage(msg);
	checkNumber(msg);
}

function writeMessage(msg) {
	msgEl.innerHTML = `
		<div>You said:</div>
		<span class="box">${msg}</span>
	`;
}

function checkNumber(msg) {
	const num = +msg;

	if(Number.isNaN(num)) {
		msgEl.innerHTML += '<div>That is not a valid number</div>';
		return;
	}

	if (num === 300) {
		msgEl.innerHTML = '<div>Launching the secret code protocol Tractorist</div>';
		return;
	}

	if (num > 100 || num < 1) {
		msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
		return;
	}

	if (num === randomNum) {
		document.body.innerHTML = `
			<h2>Congrats! You have guessed the number! <br><br>
			It was ${num}</h2>
			<button class="play-again" id="play-again">Play Again</button>
		`;
	} else if (num > randomNum) {
		msgEl.innerHTML += '<div>GO LOWER</div>';
	} else {
		msgEl.innerHTML += '<div>GO HIGHER</div>';
	}
}

recognition.addEventListener('result', onSpeack);
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
	if(e.target.id == 'play-again') {
		window.location.reload();
	}
});

function getRandomNumber() {
	return Math.floor(Math.random() * 100) + 1;
}