/**
 * @class Model Represents the model class of the MVC architecture.
 * @param data - array of data objects
 */
export class Model {
  constructor(data) {
    this._data = data;
    console.log(this._data);
  }

  /** get an item based on its id */
  getId = (id) => this._data.find((item) => item.id === id);

  /** convert an id to an array of its child objects */
  getChildren = (dataId) => this.getId(dataId).children.map((child) => this.getId(child));
}
