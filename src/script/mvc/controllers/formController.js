export class FormController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.initListeners();
    this.pullOrderData();
  }

  initListeners() {
    /** ensures field validation on key up */
    document.addEventListener(
      'keyup',
      (e) => {
        if (e.target.tagName == 'INPUT') {
          this.validateField(e.target);
        }
      },
      false
    );

    /** ensures field validation on click */
    document.addEventListener(
      'click',
      (e) => {
        if (e.target.tagName == 'INPUT') {
          this.validateField(e.target);
        }

        switch (e.target.getAttribute('id')) {
          case 'orderBtn':
            this.validateForm(e);
            break;
          case 'modal-return':
          case 'cancelBtn':
            this.goBack();
            break;
          case 'modal-submit':
            this.view.showModal2();
            this.saveFormData();
            break;
          case 'modal-close':
            this.view.hideModal1();
            break;
        }
      },
      false
    );
    /** ensures field validation on lose focus */
    document.addEventListener(
      'blur',
      (e) => {
        if (e.target.tagName == 'INPUT') {
          this.validateField(e.target);
        }
      },
      false
    );
  }

  /** check if length is between min and max */
  lengthBetween = (length, min, max) => {
    return min <= length && max >= length;
  };

  /** send the field to be validated */
  validateField(field) {
    const index = this.getValidationIndex(field.getAttribute('name'));
    if (index != null) {
      if (this.testValidation(field, index)) this.view.showValid(field);
    }
  }

  /** Validates entire form before submission (on submit button click) */
  validateForm(e) {
    e.preventDefault();
    console.log('validating');
    for (let i = 0; i < this.model.FORM_VALIDATION.length; i++) {
      let field = this.view.form[this.model.FORM_VALIDATION[i].field];
      if (this.testValidation(field, i)) this.view.showValid(field);
      else return;
    }
    this.view.showModal1();
  }

  /** Gets the index from the validation array for the fieldName*/
  getValidationIndex(fieldName) {
    for (let i = 0; i < this.model.FORM_VALIDATION.length; i++) {
      if (this.model.FORM_VALIDATION[i].field === fieldName) return i;
    }
    return null;
  }

  /** Tests the field with the provided validation index
   * @returns true if the field is valid
   */
  testValidation(field, i) {
    if (
      !this.lengthBetween(
        field.value.length,
        this.model.FORM_VALIDATION[i].length[0],
        this.model.FORM_VALIDATION[i].length[1]
      )
    ) {
      this.view.showError(field, this.model.FORM_VALIDATION[i].length[2]);
      return false;
    }
    if (this.model.FORM_VALIDATION[i].regex[0].test(field.value) == false) {
      this.view.showError(field, this.model.FORM_VALIDATION[i].regex[1]);
      return false;
    }
    return true;
  }

  /** Change page back to index */
  goBack() {
    window.open('./index.html', '_self');
  }

  /** Pull the order data from the browser storage */
  pullOrderData() {
    const orderData = JSON.parse(localStorage.getItem('sale-data'));
    if (this.orderData === null) {
      this.goBack();
    } else {
      this.view.buildSummary(orderData);
    }
  }

  /** Save form data to local storage */
  saveFormData() {
    let formData = { ['form-data']: {} };
    for (let item of this.view.form) {
      if (item.name.length > 0) formData['form-data'][item.name] = item.value;
    }
    localStorage.setItem('form-data', JSON.stringify(formData));
  }
}
