class PortfolioItem {
  constructor(div) {
    this.div = div;
  }
  set div(el) {
    this._div = el;
  }
  get div() {
    return this._div;
  }
  item(name, img, link) {
    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'item');
    this.div.appendChild(divItem);

    let linkEl = document.createElement('a');
    linkEl.setAttribute('href', `${link}`);
    divItem.appendChild(linkEl);

    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', `${img}`);
    imgEl.setAttribute('alt', `${name}`);
    linkEl.appendChild(imgEl);

    let nameEl = document.createElement('p');
    let nameValue = document.createTextNode(`${name}`);
    nameEl.appendChild(nameValue);
    nameEl.setAttribute('class', 'item-title');
    linkEl.appendChild(nameEl);
  }
}

export default PortfolioItem;