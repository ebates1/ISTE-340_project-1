export class FormModel {
  constructor() {
    this.FORM_VALIDATION = [
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
  }
}
