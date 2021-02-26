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
    this.initClickListener();
    this.initSelectListeners();
  }

  /**Initialize all types of listeners for the app */
  initClickListener() {
    // only initialize one click listener doing bubbling on the document (better performance)
    document.addEventListener('click', (e) => {
      switch (e.target.getAttribute('id')) {
        case 'nav-list': // navigation links
          e.preventDefault();
          if (e.target.classList.contains('nav-list__link')) {
            const id = e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case 'select-confirm-button': // selection confirmation
          localStorage.clear();
          localStorage.setItem('sale-data', JSON.stringify(this._saleData));
          window.open('./order.html', '_self');
          break;
        case 'landing-button': // button in header
          document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
          break;
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
}
