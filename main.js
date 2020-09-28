const bodyElement = document.body;
const date = new Date();
const time = date.getHours();
const inputSwitch = document.querySelector('input[name=dark-mode]');
const itemTitleAll = document.querySelectorAll('.item-title');
const itemImgAll = document.querySelectorAll('.item img');

const ulSkills = document.querySelector('.skills ul');
const lastSkill = document.querySelector('.lastSkill');
const spanCountdown = document.querySelector('.countdown');
const faClock = document.querySelector('.fa-clock');

darkMode(time);

inputSwitch.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
});

function darkMode(time) {
    if (time > 20 || time < 6) {
        inputSwitch.checked = true;
        bodyElement.classList.add('dark-mode');
    } else {
        inputSwitch.checked = false;
        bodyElement.classList.remove('dark-mode');
    }
}

if ('ontouchstart' in bodyElement) {
    itemTitleAll.forEach(itemTitle => {
        itemTitle.style.visibility = "visible";
        itemTitle.style.backgroundColor = "#0000007c";
    })
    itemImgAll.forEach(img => {
        img.style.animation = "filter-animation 5s infinite";
    })
    clockMouseEvent('touchstart', 'touchend');
}

// Countdown to new skill
let dueDate = new Date(2020, 9, 10).getTime();
let dateTime = date.getTime();

countdown(dateTime, dueDate);

function countdown(dateTime, dueDate) {
    let daysLeft = Math.floor((dueDate - dateTime) / 1000 / 60 / 60 / 24);
    let weeksLeft = (daysLeft - (daysLeft % 7)) / 7;
    let text;

    daysLeft = (daysLeft % 7) > 1 ? (daysLeft % 7) + ' days':
        (daysLeft % 7) == 1 ? (daysLeft % 7) + ' day' : '';

    weeksLeft = weeksLeft > 1 ? weeksLeft + ' weeks':
        weeksLeft == 1 ? weeksLeft + ' week' : '';

    if (daysLeft && weeksLeft) {
        text = document.createTextNode(`Exactly ${weeksLeft} and ${daysLeft} away from completing React training.`);
    } else if (!daysLeft && weeksLeft) {
        text = document.createTextNode(`Exactly ${weeksLeft} away from completing React training.`);
    } else if (daysLeft && !weeksLeft) {
        text = document.createTextNode(`Exactly ${daysLeft} away from completing React training.`);
    } else {
        text = document.createTextNode(`Completed additional React training.`);
        lastSkill.textContent = 'React';
    }
    spanCountdown.appendChild(text);
}

clockMouseEvent('mouseenter', 'mouseleave');

function clockMouseEvent(eventOn, eventOff) {
    faClock.addEventListener(eventOn, () => {
        if (eventOn == 'touchstart') {
            let divAlert = document.createElement('div');
            let countdownText = document.createTextNode(spanCountdown.textContent);
            divAlert.appendChild(countdownText);
            divAlert.setAttribute('class', 'divAlert');
            ulSkills.appendChild(divAlert);

            return;
        }
        if (bodyElement.classList.contains('dark-mode')) {
            spanCountdown.style.color = '#ffe605';
            return;
        }
        spanCountdown.style.color = '#4f46fd';
    });
    faClock.addEventListener(eventOff, () => {
        if (eventOff == 'touchend') {
            setTimeout(() => {
                ulSkills.removeChild(ulSkills.lastChild);
            }, 3000);

            return;
        }
        setTimeout(() => {
            spanCountdown.style.color = '';
        }, 400);
    });
}