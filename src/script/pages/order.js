/** Plugins and Support features */
import { supportsAvif } from '../util/imageSupport.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

const imageContainer = document.querySelector('#packageImage');
const packageName = document.querySelector('#packageName');
const packageCost = document.querySelector('#packageCost');
const packageTax = document.querySelector('#packageTax');
const packageFinalPrice = document.querySelector('#packageFinalPrice');
const modal1 = document.querySelector('#modal-one');
const modal2 = document.querySelector('#modal-two');
const modalItem = document.querySelector('.modal-container > h2');
const modalPrice = document.querySelector('.modal-container > h3');
const modalSubmit = document.querySelector('.modal-submit');
const modalClose = document.querySelector('.modal-close');
const modalReturn = document.querySelector('.modal-return');

/** initialize AOS plugin */
AOS.init();

/** check images for avif support (async) */
(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif';
  document.querySelectorAll('.bg-image').forEach((e) => e.classList.add(classAvif));
})();

/** sets path of image in container  */
const setImagePath = (path) => {
  imageContainer.children[0].srcset = path;
  imageContainer.children[1].src = path;
};

//source https://flaviocopes.com/how-to-format-number-as-currency-javascript/
/** Formats currency to US */
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

/** Pulls the order data from local storage and sets the information */
(function () {
  const orderData = JSON.parse(localStorage.getItem('sale-data'));
  packageName.textContent = orderData['title'];
  modalItem.textContent = orderData['title'];
  packageCost.textContent = formatter.format(orderData['cost']);
  packageTax.textContent = formatter.format(orderData['cost'] * 0.15);
  packageFinalPrice.textContent = formatter.format(orderData['cost'] * 0.15 + orderData['cost']);
  modalPrice.textContent = formatter.format(orderData['cost'] * 0.15 + orderData['cost']);
  setImagePath(orderData['image']);
  modalSubmit.addEventListener('click', () => {
    modal2.classList.add('open');
    modal1.classList.remove('open');
  });
  modalClose.addEventListener('click', () => {
    modal1.classList.remove('open');
  });
  modalReturn.addEventListener('click', () => {
    window.open('./index.html', '_self');
  });
})();
