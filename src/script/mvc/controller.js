/**
 * @class Controller
 * @param model
 * @param view
 */
export class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._selected = 0;

    this.initSelects(3); // build the selects
    this.initListeners();
  }

  initListeners() {
    this.initSelectListeners(); // attach the select listeners
    this.initButtonListeners();
  }

  initButtonListeners() {
    this._view.orderBtn.addEventListener('click', () => this.handleSubmitButton());
  }

  /* initialize the on change listeners for the selects */
  initSelectListeners() {
    this._view.selects.forEach(
      (sel) => (sel.onchange = () => this.handleSelectChange(Number(sel.dataset.select), sel.value))
    );
  }

  /* handle an option change for the select */
  handleSelectChange(id, value) {
    console.log(id + ' was changed!');

    console.log('the next select should be ' + value);
    this._view.setImagePath(this._model.getId(Number(value))['image']);
    if (id < this._view.selects.length - 1) {
      this.clearChildSelects(id);
      this.populateSelect(id + 1, value);
      this._view.hideOrderButton();
    } else {
      console.log('getting local data for storage');
      console.log(value);
      this._saleData = this._model.getId(Number(value))['sale-data'];
      this._view.showOrderButton();
    }
  }

  /* Gets children of selected option */
  getChildren() {}

  /* Clears the provided select options */
  clearChildSelects(id) {
    for (let i = id + 1; i < this._view.selects.length; i++) {
      this._view.clearSelect(i);
    }
  }

  /*Initialize the first select */
  initSelects(amount) {
    for (let i = 0; i < amount; i++) {
      this._view.addSelectToContainer(i);
    }
    this._view.getSelects();
    this.populateSelect(0, 0);
  }

  /* Populates the provided select with children based on parent */
  populateSelect(selectId, dataId) {
    this._model.getChildren(Number(dataId)).forEach((item) => {
      this._view.addOptionToSelect(selectId, item);
      this._view.setSelectTitle(selectId, item.title);
    });
    this._view.showSelect(selectId);
  }

  /* Hides the provided select */
  hideSelect() {}

  /* Sets the image to the cooresponding select */
  setImage() {}

  /* Activates submit button */
  activateSubmitButton() {}

  /* Makes submit button not active */
  deactivateSubmitButton() {}

  /* Handles clicking of the submit button */
  handleSubmitButton() {
    localStorage.clear();
    localStorage.setItem('sale-data', JSON.stringify(this._saleData));
    window.open('./order.html', '_self');
  }
}
