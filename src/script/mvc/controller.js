/**
 * @class Controller
 * @param model
 * @param view
 */
export class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._selected = 0; // set initial selected to 0
    this.initSelects(3); // build the  3 selects (change to support more)
    this.initListeners();
  }

  /**Initialize all types of listeners for the app */
  initListeners() {
    this.initSelectListeners();
    this.initButtonListeners();
    this.initNavListeners();
  }

  /**Initialize the button click listeners */
  initButtonListeners() {
    this._view.headerButton.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
    });

    this._view.orderBtn.addEventListener('click', () => this.handleSubmitButton());
  }

  /**Initialize the click listeners for the navbar */
  initNavListeners() {
    document.querySelector('.nav-list').addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target;
      if (target.classList.contains('nav-list__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* initialize the on change listeners for the selects */
  initSelectListeners() {
    this._view.selects.forEach(
      (sel) => (sel.onchange = () => this.handleSelectChange(Number(sel.dataset.select), sel.value))
    );
  }

  /* handle an option change for the select */
  handleSelectChange(id, value) {
    this._view.setImagePath(this._model.getId(Number(value))['image']);
    if (id < this._view.selects.length - 1) {
      this.clearChildSelects(id);
      this.populateSelect(id + 1, value);
      this._view.hideOrderButton();
    } else {
      this._saleData = this._model.getId(Number(value))['sale-data'];
      this._view.showOrderButton();
    }
  }

  /** Gets children of selected option */
  getChildren() {}

  /** Clears the provided select options */
  clearChildSelects(id) {
    for (let i = id + 1; i < this._view.selects.length; i++) {
      this._view.clearSelect(i);
    }
  }

  /** Initialize the first select */
  initSelects(amount) {
    for (let i = 0; i < amount; i++) {
      this._view.addSelectToContainer(i);
    }
    this._view.getSelects();
    this.populateSelect(0, 0);
  }

  /** Populates the provided select with children based on parent */
  populateSelect(selectId, dataId) {
    this._model.getChildren(Number(dataId)).forEach((item) => {
      this._view.addOptionToSelect(selectId, item);
      this._view.setSelectTitle(selectId, item.title);
    });
    this._view.showSelect(selectId);
  }

  /** Handles clicking of the submit button */
  handleSubmitButton() {
    localStorage.clear();
    localStorage.setItem('sale-data', JSON.stringify(this._saleData));
    window.open('./order.html', '_self');
  }
}
