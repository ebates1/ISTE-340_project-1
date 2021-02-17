import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

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

logoButton.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#landing').scrollIntoView({ behavior: 'smooth' });
});
