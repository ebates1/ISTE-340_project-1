/** Plugins and Support features */
import { supportsAvif } from '../util/imageSupport.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

/** MVC App imports */
import { FormModel } from './models/formModel';
import { FormView } from './views/formView';
import { FormController } from './controllers/formController';

AOS.init(); // initialize AOS plugin
/** check images for avif support (async)*/
(async () => {
  const classAvif = (await supportsAvif()) ? 'avif' : 'no-avif';
  document.querySelectorAll('.bg-image').forEach((e) => e.classList.add(classAvif));
})();

(function () {
  /** Start the mvc app */
  const app = new FormController(new FormModel(), new FormView());
})();
