const form = document.getElementById('form');
const formFields = document.querySelectorAll('.form-fields');
const nameField = formFields[0];
const emailField = formFields[1];
const messageField = formFields[2];
const btnSubmit = document.querySelector('.btn-submit');
const formStatus = document.getElementById('form-status');
const formWrapper = document.querySelector('.form-wrapper');

function formStyle() {
  form.addEventListener('focus', event => {
    event.target.classList.add('bg-input')
  }, true)
  
  form.addEventListener('blur', event => {
    event.target.classList.remove('bg-input');
  }, true)
  
  formFields.forEach(field => {
    field.addEventListener('change', event => {
      if (event.target.value) {
        field.classList.add('filled');
      } else {
        field.classList.remove('filled');
      }
    });

  });
}

let data = {
  name: "",
  email: "",
  message: ""
}

function formValidation() {
  nameField.addEventListener('blur', () => {
    if (nameField.value.length > 2 || !nameField.value) {
      nameField.classList.remove('error');
      data.name = nameField.value;
    } else {
      nameField.classList.add('error');
    }
  });

  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  emailField.addEventListener('blur', () => {
    if (emailField.value.match(regexEmail) || !emailField.value) {
      emailField.classList.remove('error');
      data.email = emailField.value;
    } else {
      emailField.classList.add('error');
    }
  });

  messageField.addEventListener('blur', () => {
    if (messageField.value.length > 5 || !messageField.value) {
      messageField.classList.remove('error');
      data.message = messageField.value;
    } else {
      messageField.classList.add('error');
    }
  });

  return data;
}

function formSubmit() {
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (data.name !== "" && data.email !== "" && data.message !== "") {
      sending(data);
      form.reset();
      handleButton();
      return;
    }

    errorMsg("Make sure you have entered the correct data, otherwise the form cannot be sent.");
  });
}

async function sending(data) {
  let response = await fetch('https://formspree.io/f/myybponr', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.status !== 200) {
    errorMsg("Oops! There's been an error while sending the form. Please try again.");
    throw new Error("Oops! There's been an error while sending the form. Please try again.")
  }
  let result = await response.json();

  return result;
}

let errorMsg = (message) => {
  return formStatus.textContent = `${message}`;
}

let handleButton = () => {
  btnSubmit.style.display = "none";
  let checkIcon = document.createElement('i');
  checkIcon.setAttribute('class', 'fa fa-check-circle');
  formWrapper.appendChild(checkIcon);
}

export {formStyle, formValidation, formSubmit};