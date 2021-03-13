import PortfolioItem from './homepage/PortfolioItem.js';
import {formStyle, formValidation, formSubmit} from './homepage/Form.js'
import {countdown, clockMouseEvent} from './homepage/LastSkill.js';

const bodyElement = document.body;
const date = new Date();
const time = date.getHours();
const divPortfolio = document.querySelector('.grid');
const inputSwitch = document.querySelector("input[name=dark-mode]");

// Portfolio
const portfolio = new PortfolioItem(divPortfolio);

portfolio.item('Memory Game', 'images/memory-game-screen.png', 'https://lazarkulasevic.github.io/memory-game/');
portfolio.item('Guess The Number', 'images/binary-search-featured.png', 'https://lazarkulasevic.github.io/binary-search/');
portfolio.item('Public Chat', 'images/chat-screen.png', 'https://lazars-chat.web.app/');
portfolio.item('Scrumdomize', 'images/scrumdomize.png', 'https://lazarkulasevic.github.io/scrumdomize/');
portfolio.item('Min-heighter', 'https://lazarkulasevic.github.io/min-heighter/images/min-heighter.png', 'https://lazarkulasevic.github.io/min-heighter/');

const itemTitleAll = document.querySelectorAll(".item-title");

// PHONE & TOUCH
if ("ontouchstart" in window) {
  itemTitleAll.forEach((itemTitle) => {
    itemTitle.style.visibility = "visible";
    itemTitle.style.backgroundColor = "#0000007c";
  });
  clockMouseEvent("touchstart", "touchend");
}

// DARK MODE
darkMode(time);

inputSwitch.addEventListener("click", () => {
  bodyElement.classList.toggle("dark-mode");
});

function darkMode(time) {
  if (time > 20 || time < 6) {
    inputSwitch.checked = true;
    bodyElement.classList.add("dark-mode");
  } else {
    inputSwitch.checked = false;
    bodyElement.classList.remove("dark-mode");
  }
}

// Last Skill 
let dueDate = new Date(2020, 10, 10).getTime();
let dateTime = date.getTime();
countdown(dateTime, dueDate);
clockMouseEvent('mouseenter', 'mouseleave');

// Contact Form
formStyle();
formValidation();
formSubmit();
