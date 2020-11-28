import {countdown, clockMouseEvent} from './modules/LastSkill.js';
import PortfolioItem from './modules/PortfolioItem.js';
import {formStyle, formValidation, formSubmit} from './modules/Form.js'

const bodyElement = document.body;
const date = new Date();
const time = date.getHours();
const divPortfolio = document.querySelector('.grid');
const inputSwitch = document.querySelector("input[name=dark-mode]");
const itemTitleAll = document.querySelectorAll(".item-title");
const itemImgAll = document.querySelectorAll(".item img");

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

// PHONE & TOUCH
if ("ontouchstart" in window) {
  itemTitleAll.forEach((itemTitle) => {
    itemTitle.style.visibility = "visible";
    itemTitle.style.backgroundColor = "#0000007c";
  });
  itemImgAll.forEach((img) => {
    img.style.animation = "filter-animation 5s infinite";
  });
  clockMouseEvent("touchstart", "touchend");
}

// Last Skill 
let dueDate = new Date(2020, 10, 10).getTime();
let dateTime = date.getTime();
countdown(dateTime, dueDate);
clockMouseEvent('mouseenter', 'mouseleave');

// Portfolio
const portfolio = new PortfolioItem(divPortfolio);

portfolio.item('Memory Game', 'images/memory-game-screen.png', 'https://lazarkulasevic.github.io/memory-game/');
portfolio.item('Guess The Number', 'images/binary-search-featured.png', 'https://lazarkulasevic.github.io/binary-search/');
portfolio.item('Public Chat', 'images/chat-screen.png', 'https://lazars-chat.web.app/');
portfolio.item('To-do List (React)', 'images/ReactToDo.png', 'https://lazarkulasevic.github.io/react-to-do/');

// Contact Form
formStyle();
formValidation();
formSubmit();
