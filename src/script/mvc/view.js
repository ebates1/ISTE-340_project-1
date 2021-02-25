/**
 * @class View
 */
export class View {
  constructor() {
    this.selectContainer = document.querySelector('.pane__selects');
    this.orderBtn = document.querySelector('#orderBtn');
    this.imageContainer = document.querySelector('.pane__view > picture');
    this.headerButton = document.querySelector('.landing__linkbutton');
    this.logoButton = document.querySelector('nav__logo');
  }

  selectHTML = (selectId) =>
    `<div class="hidden" data-aos="fade-right"><h5>title</h5><select data-select="${selectId}" class="select"></select></div>`;

  optionHTML = (value, text) => `<option value="${value}">${text}</option>`;

  defaultOption = '<option disabled selected value> -- select an option -- </option>';

  addSelectToContainer = (selectId) => {
    this.insertAtEnd(this.selectContainer, this.selectHTML(selectId));
  };

  addOptionToSelect = (selectId, item) => {
    console.log('adding options');
    this.selects[selectId].options.add(
      this.createElement('option', this.optionHTML(item.id, item.value))
    );
  };

  setSelectTitle = (selectId, title) => {
    const select = this.selects[selectId];
    select.parentElement.querySelector('h5').textContent = title;
  };

  clearSelect = (selectId) => {
    const select = this.selects[selectId];
    this.selects[selectId].innerHTML = '';
    select.options.add(this.createElement('option', this.defaultOption));
    select.parentElement.classList.add('hidden');
  };

  getSelects = () => {
    this.selects = document.querySelectorAll('select');
    this.selects[0].parentElement.classList.toggle('hidden');
    this.selects[0].options.add(this.createElement('option', this.defaultOption));
  };

  showSelect = (selectId) => {
    if (selectId != 0) this.selects[selectId].parentElement.classList.remove('hidden'); // show the select;
  };

  showOrderButton = () => this.orderBtn.classList.remove('hidden');

  hideOrderButton = () => this.orderBtn.classList.add('hidden');

  insertAtEnd = (element, html) => element.insertAdjacentHTML('beforeend', html);

  createElement = (name, innerHTML) =>
    new DOMParser().parseFromString(innerHTML, 'text/html').querySelector(name);

  setImagePath(path) {
    this.imageContainer.children[0].srcset = path;
    this.imageContainer.children[1].src = path;
  }
}
