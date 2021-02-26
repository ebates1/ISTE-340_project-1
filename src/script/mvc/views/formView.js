export class FormView {
  constructor() {
    this.form = document.forms['orderForm'];
    this.modal1 = document.querySelector('#modal-one');
    this.modal2 = document.querySelector('#modal-two');
    this.imageContainer = document.querySelector('#packageImage');
    this.packageName = document.querySelector('#packageName');
    this.packageCost = document.querySelector('#packageCost');
    this.packageTax = document.querySelector('#packageTax');
    this.packageFinalPrice = document.querySelector('#packageFinalPrice');
    this.modalItem = document.querySelector('.modal-container > h2');
    this.modalPrice = document.querySelector('.modal-container > h3');
    this.modalSubmit = document.querySelector('.modal-submit');
    this.modalClose = document.querySelector('.modal-close');
    this.modalReturn = document.querySelector('.modal-return');
  }

  showError(field, errorMsg) {
    const formRow = field.parentElement;
    formRow.classList.add('invalid');
    formRow.classList.remove('valid');
    const message = formRow.querySelector('p');
    message.innerHTML = errorMsg;
  }

  showValid(field) {
    const formRow = field.parentElement;
    formRow.classList.remove('invalid');
    formRow.classList.add('valid');
    const message = formRow.querySelector('p');
    message.innerHTML = 'Looks Good!';
  }

  showModal1() {
    this.modal1.classList.add('open');
  }

  showModal2() {
    this.modal2.classList.add('open');
    this.modal1.classList.remove('open');
  }

  hideModal1() {
    this.modal1.classList.remove('open');
  }

  buildSummary(orderData) {
    console.log('made it');
    this.packageName.textContent = orderData['title'];
    this.modalItem.textContent = orderData['title'];
    this.packageCost.textContent = this.formatter.format(orderData['cost']);
    this.packageTax.textContent = this.formatter.format(orderData['cost'] * 0.15);
    this.packageFinalPrice.textContent = this.formatter.format(
      orderData['cost'] * 0.15 + orderData['cost']
    );
    this.modalPrice.textContent = this.formatter.format(
      orderData['cost'] * 0.15 + orderData['cost']
    );
    this.setImagePath(orderData['image']);
  }

  /** sets path of image in container  */
  setImagePath = (path) => {
    this.imageContainer.children[0].srcset = path;
    this.imageContainer.children[1].src = path;
  };

  //source https://flaviocopes.com/how-to-format-number-as-currency-javascript/
  /** Formats currency to US */
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}
