const bodyElement = document.body;
const date = new Date();
const time = date.getHours();
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
if ("ontouchstart" in bodyElement) {
  itemTitleAll.forEach((itemTitle) => {
    itemTitle.style.visibility = "visible";
    itemTitle.style.backgroundColor = "#0000007c";
  });
  itemImgAll.forEach((img) => {
    img.style.animation = "filter-animation 5s infinite";
  });
  clockMouseEvent("touchstart", "touchend");
}

// ################### Last Skill ###################
import {countdown, clockMouseEvent} from './modules/LastSkill.js';

let dueDate = new Date(2020, 9, 31).getTime();
let dateTime = date.getTime();
countdown(dateTime, dueDate);
clockMouseEvent('mouseenter', 'mouseleave');
// ##################################################