const bodyElement = document.body;
const time = new Date().getHours();
const inputSwitch = document.querySelector('input[name=dark-mode]');

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