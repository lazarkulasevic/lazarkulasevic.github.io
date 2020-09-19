const bodyElement = document.body;
const time = new Date().getHours();
const inputSwitch = document.querySelector('input[name=dark-mode]');
// const imgMountain = document.querySelector('.mountain');


darkMode(time);

inputSwitch.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    // imgMountain.classList.toggle('dark-filter');
});

function darkMode(time, element) {
    if (time > 20 || time < 6) {
        inputSwitch.checked = true;
        bodyElement.classList.add('dark-mode');
        // element.classList.add('dark-filter');
    } else {
        inputSwitch.checked = false;
        bodyElement.classList.remove('dark-mode');
        // element.classList.remove('dark-filter');
    }
}



