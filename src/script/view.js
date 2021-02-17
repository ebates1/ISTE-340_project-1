export class View {
  constructor() {
    this.selectContainer = document.querySelector('.pane__selects');
    this.selectHTML = (selectId) =>
      `<div class="hidden" data-aos="fade-right"><h5>title</h5><select data-select="${selectId}" class="select"></select></div>`;
    this.optionHTML = (value, text) => `<option value="${value}">${text}</option>`;
    this.defaultOption = '<option disabled selected value> -- select an option -- </option>';
    this.orderBtn = document.querySelector('#orderBtn');
  }

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

  showSelect(selectId) {
    if (selectId != 0) this.selects[selectId].parentElement.classList.remove('hidden'); // show the select;
  }

  showOrderButton() {
    this.orderBtn.classList.remove('hidden');
  }

  hideOrderButton() {
    this.orderBtn.classList.add('hidden');
  }

  insertAtEnd = (element, html) => element.insertAdjacentHTML('beforeend', html);

  createElement = (name, innerHTML) =>
    new DOMParser().parseFromString(innerHTML, 'text/html').querySelector(name);
}
