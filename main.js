import PortfolioItem from './homepage/portfolio/PortfolioItem.js';
import items from './homepage/portfolio/items.js'
import {formStyle, formValidation, formSubmit} from './homepage/Form.js'
import {countdown, clockMouseEvent} from './homepage/LastSkill.js';

const bodyElement = document.body;
const date = new Date();
const time = date.getHours();
const divPortfolio = document.querySelector('.grid');
const inputSwitch = document.querySelector("input[name=dark-mode]");

// Portfolio
const portfolio = new PortfolioItem(divPortfolio);

items.forEach(item => {
  const { name, image, link } = item
  portfolio.item(name, image, link)
})

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
let dueDate = new Date(2021, 6, 1).getTime();
let dateTime = date.getTime();
countdown(dateTime, dueDate);
clockMouseEvent('mouseenter', 'mouseleave');

// Contact Form
formStyle();
formValidation();
formSubmit();
