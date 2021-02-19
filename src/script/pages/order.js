//Plugins and Support features
import { supportsAvif } from '../util/imageSupport.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

const imageContainer = document.querySelector('#packageImage');
const packageName = document.querySelector('#packageName');
const packageCost = document.querySelector('#packageCost');
const packageTax = document.querySelector('#packageTax');
const packageFinalPrice = document.querySelector('#packageFinalPrice');

AOS.init(); // initialize AOS plugin
/* check images for avif support (async)*/
(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif';
  document.querySelectorAll('.bg-image').forEach((e) => e.classList.add(classAvif));
})();

const setImagePath = (path) => {
  imageContainer.children[0].srcset = path;
  imageContainer.children[1].src = path;
};

//source https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

(function () {
  const orderData = JSON.parse(localStorage.getItem('sale-data'));
  packageName.textContent = orderData['title'];
  packageCost.textContent = formatter.format(orderData['cost']);
  packageTax.textContent = formatter.format(orderData['cost'] * 0.15);
  packageFinalPrice.textContent = formatter.format(orderData['cost'] * 0.15 + orderData['cost']);
  setImagePath(orderData['image']);
})();
