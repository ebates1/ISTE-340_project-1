//Plugins and Support features
import { supportsAvif } from './imageSupport.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

//MVC App imports
import { Model } from './model';
import { View } from './view';
import { Controller } from './controller';

import data from '/res/data/data.json';

/* Deal with the background images asynchronously */
(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif';
  document.querySelectorAll('.bg-image').forEach((e) => e.classList.add(classAvif));
})();

/* Start the mvc app */
(function () {
  AOS.init();
  const app = new Controller(new Model(data), new View());

  // fetch(DATA_URL)
  //   .then((response) => response.json())
  //   .then((data) => new Controller(new Model(data), new View()))
  //   .catch((error) =>
  //     alert(`Trouble reading the data file. Please check the file and try again. ${error}`)
  //   );

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

// logoButton.addEventListener('click', (e) => {
//   e.preventDefault();
//   document.querySelector('#landing').scrollIntoView({ behavior: 'smooth' });
// });
