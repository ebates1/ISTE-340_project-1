/** The submission form */
const form = document.forms['orderForm'];

/** ensures field validation on key up */
document.addEventListener(
  'keyup',
  function (e) {
    if (e.target.tagName == 'INPUT') {
      validateField(e.target);
    }
  },
  false
);

/** ensures field validation on click */
document.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName == 'INPUT') {
      validateField(e.target);
    }
    if (e.target.getAttribute('id') === 'orderBtn') {
      console.log('woooo');
      validateForm(e);
    }
    if (e.target.getAttribute('id') === 'cancelBtn') {
      window.open('./index.html', '_self');
    }
  },
  false
);
/** ensures field validation on lose focus */
document.addEventListener(
  'blur',
  function (e) {
    if (e.target.tagName == 'INPUT') {
      validateField(e.target);
    }
  },
  false
);

/**A simple array containing the form validation rules and messages */
const FORM_VALIDATION = [
  {
    field: 'formName',
    length: [1, 30, 'Please enter a name between 1 - 30 characters.'],
    regex: [
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u,
      'Illegal character submitted, please correct and try again!',
    ],
  },
  {
    field: 'formEmail',
    length: [4, 40, 'Please enter a valid email.'],
    regex: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email address, use format: john@example.com',
    ],
  },
  {
    field: 'formPhoneNumber',
    length: [6, 30, 'Please enter a valid phone number.'],
    regex: [/^\d+$/, 'Please use only numbers!'],
  },
];

/** check if length is between min and max */
const lengthBetween = (length, min, max) => {
  return min <= length && max >= length;
};

/** Display an error on the form row */
function showError(field, errorMsg) {
  const formRow = field.parentElement;
  formRow.classList.add('invalid');
  formRow.classList.remove('valid');
  const message = formRow.querySelector('p');
  message.innerHTML = errorMsg;
}

/** Display a valid on the form row */
function showValid(field) {
  const formRow = field.parentElement;
  formRow.classList.remove('invalid');
  formRow.classList.add('valid');
  const message = formRow.querySelector('p');
  message.innerHTML = 'Looks Good!';
}

/** send the field to be validated */
function validateField(field) {
  const index = getValidationIndex(field.getAttribute('name'));
  if (index != null) {
    if (testValidation(field, index)) showValid(field);
  }
}

/** Validates entire form before submission (on submit button click) */
function validateForm(e) {
  e.preventDefault();
  console.log('validating');
  for (let i = 0; i < FORM_VALIDATION.length; i++) {
    let field = form[FORM_VALIDATION[i].field];
    if (testValidation(field, i)) showValid(field);
    else return;
  }
  let modal = document.querySelector('#modal-one');
  modal.classList.add('open');
}

/** Gets the index from the validation array for the fieldName*/
function getValidationIndex(fieldName) {
  for (let i = 0; i < FORM_VALIDATION.length; i++) {
    if (FORM_VALIDATION[i].field === fieldName) return i;
  }
  return null;
}

/** Tests the field with the provided validation index
 * @returns true if the field is valid
 */
function testValidation(field, i) {
  if (
    !lengthBetween(field.value.length, FORM_VALIDATION[i].length[0], FORM_VALIDATION[i].length[1])
  ) {
    showError(field, FORM_VALIDATION[i].length[2]);
    return false;
  }
  if (FORM_VALIDATION[i].regex[0].test(field.value) == false) {
    showError(field, FORM_VALIDATION[i].regex[1]);
    return false;
  }
  return true;
}
