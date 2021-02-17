export class View {
  constructor() {
    this.selects = document.querySelectorAll('select');

    this.addButton = document.querySelector('#addItem');
    this.singButton = document.querySelector('#singItem');
    this.tricksButton = document.querySelector('#doTricksItem');
    this._animalsDiv = document.querySelector('#animalsDiv');
    this._logDiv = document.querySelector('#logDiv');

    this._animalHTML = (animalImage, animalName) =>
      `<div><img src='${animalImage}'><input value='${animalName}'></div>`;

    this._singHTML = (singString) =>
      `<div><span>Group Sing clicked</span><span>${singString}</span></div>`;

    this._trickHTML = (trickString) =>
      `<div><span>Group Trick clicked</span><span>${trickString}</span></div>`;

    this._addAnimalHTML = `<div><span>Add Animal clicked</span></div>`;
  }

  addAnimalToContainer = (image, name) =>
    this.insertAtEnd(this._animalsDiv, this._animalHTML(image, name));

  logSing = (singMessage) => this.insertAtEnd(this._logDiv, this._singHTML(singMessage));

  logTrick = (trickMessage) => this.insertAtEnd(this._logDiv, this._trickHTML(trickMessage));

  logAnimal = (animalMessage) => this.insertAtEnd(this._logDiv, this._addAnimalHTML);

  insertAtEnd = (element, html) => element.insertAdjacentHTML('beforeend', html);
}
