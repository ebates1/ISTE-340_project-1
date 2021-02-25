/** Plugins and Support features */
import { supportsAvif } from '../util/imageSupport.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

/** MVC App imports */
import { Model } from './model';
import { View } from './view';
import { Controller } from './controller';

/** The data json file import */
import data from '/res/data/data.json';

AOS.init(); // initialize AOS plugin
/** check images for avif support (async)*/
(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif';
  document.querySelectorAll('.bg-image').forEach((e) => e.classList.add(classAvif));
})();

(function () {
  /** Start the mvc app */
  const app = new Controller(new Model(data), new View());
})();
