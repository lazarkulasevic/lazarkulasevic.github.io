// Countdown to new skill
const divSkills = document.querySelector(".skills");
const lastSkill = document.querySelector(".lastSkill");
const spanCountdown = document.querySelector(".countdown");
const faClock = document.querySelector(".fa-clock");

function countdown(dateTime, dueDate) {
	let daysLeft = Math.floor((dueDate - dateTime) / 1000 / 60 / 60 / 24);
	let weeksLeft = (daysLeft - (daysLeft % 7)) / 7;
	let text;

	daysLeft = (daysLeft % 7) > 1 ? (daysLeft % 7) + ' days' :
		(daysLeft % 7) === 1 ? (daysLeft % 7) + ' day' : '';

	weeksLeft = weeksLeft > 1 ? weeksLeft + ' weeks' :
		weeksLeft === 1 ? weeksLeft + ' week' : '';

	if (daysLeft && weeksLeft) {
		text = document.createTextNode(
			`Approximately ${weeksLeft} and ${daysLeft} left to learn Node.js with Express and MongoDB.`
		);
	} else if (!daysLeft && weeksLeft) {
		text = document.createTextNode(
			`Approximately ${weeksLeft} left to learn Node.js with Express and MongoDB.`
		);
	} else if (daysLeft && !weeksLeft) {
		text = document.createTextNode(
			`Approximately ${daysLeft} left to learn Node.js with Express and MongoDB.`
		);
	} else {
		text = document.createTextNode(
			`I have learned Node.js.`
		);
		lastSkill.textContent = 'Node.js';
	}
	spanCountdown.appendChild(text);
}

function clockMouseEvent(eventOn, eventOff) {
	let clicked = false;
	faClock.addEventListener(eventOn, () => {
		if (eventOn === 'touchstart' && !clicked) {
			clicked = true;

			let divAlert = document.createElement('div');
			let countdownText = document.createTextNode(spanCountdown.textContent);
			divAlert.appendChild(countdownText);
			divAlert.setAttribute('class', 'divAlert');
			divSkills.appendChild(divAlert);

			setTimeout(() => {
				divSkills.removeChild(divSkills.lastChild);
				clicked = false;
			}, 3000);
		}
		if (document.body.classList.contains('dark-mode')) {
			spanCountdown.style.color = '#ffe605';
			return;
		}
		spanCountdown.style.color = '#4f46fd';
	});
	faClock.addEventListener(eventOff, () => {
		setTimeout(() => {
			spanCountdown.style.color = '';
		}, 400);
	});
}

export {countdown, clockMouseEvent};
