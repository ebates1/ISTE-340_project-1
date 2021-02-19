//Plugins and Support features
import { supportsAvif } from '../util/imageSupport.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

//MVC App imports
import { Model } from './model';
import { View } from './view';
import { Controller } from './controller';

import data from '/res/data/data.json';

AOS.init(); // initialize AOS plugin
/* check images for avif support (async)*/
(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif';
  document.querySelectorAll('.bg-image').forEach((e) => e.classList.add(classAvif));
})();

/* Start the mvc app */
(function () {
  const app = new Controller(new Model(data), new View());

  const headerButton = document.querySelector('.landing__linkbutton');
  const logoButton = document.querySelector('nav__logo');

  document.querySelector('.nav-list').addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('nav-list__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

  headerButton.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
  });
})();
