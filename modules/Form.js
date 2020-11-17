const form = document.getElementById('form');
const formFields = document.querySelectorAll('.form-fields');

function formEvents() {
  form.addEventListener('submit', event => {
    event.preventDefault();
  
  });
  
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

export {formEvents};