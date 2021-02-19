export class Model {
  constructor(data) {
    this._data = data;
    console.log(this._data);
  }

  getId = (id) => this._data.find((item) => item.id === id);

  //convert an id to an array of its child objects
  getChildren = (dataId) => this.getId(dataId).children.map((child) => this.getId(child));
}
