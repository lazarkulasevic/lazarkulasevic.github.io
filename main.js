const bodyElement = document.body;
const time = new Date().getHours();
const inputSwitch = document.querySelector('input[name=dark-mode]');
const imgMountain = document.querySelectorAll('.mountain');

darkMode(time);

inputSwitch.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode');
    imgMountain[0].classList.toggle('dark-filter');
    imgMountain[1].classList.toggle('dark-filter');
});

function darkMode(time) {
    if (time > 20 || time < 6) {
        inputSwitch.checked = true;
        bodyElement.classList.add('dark-mode');
        imgMountain[0].classList.add('dark-filter');
        imgMountain[1].classList.add('dark-filter');
    } else {
        inputSwitch.checked = false;
        bodyElement.classList.remove('dark-mode');
        imgMountain[0].classList.remove('dark-filter');
        imgMountain[1].classList.remove('dark-filter');
    }
}




