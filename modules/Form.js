const form = document.getElementById('form');
const formFields = document.querySelectorAll('.form-fields');
const nameField = formFields[0];
const emailField = formFields[1];
const messageField = formFields[2];

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
    })
  });  
}

let data = {};

function formValidation() {
  data = {
    name: "",
    email: "",
    message: ""
  }

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
      console.log(data);

    } else {
      console.log('Make sure you have entered the correct data.');

    }
    
    
  });
}

export {formStyle, formValidation, formSubmit};