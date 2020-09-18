const bodyElement = document.body;
const time = new Date().getHours();
const inputSwitch = document.querySelector('input[name=dark-mode]');
const imgMountain = document.getElementById('mountain');

darkMode(time);

inputSwitch.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    imgMountain.classList.toggle('dark-filter');
});

function darkMode(time) {
    if (time > 20 || time < 6) {
        bodyElement.classList.add('dark-mode');
        imgMountain.classList.add('dark-filter');
        inputSwitch.checked = true;
    } else {
        bodyElement.classList.remove('dark-mode');
        imgMountain.classList.remove('dark-filter');
        inputSwitch.checked = false;
    }
}





