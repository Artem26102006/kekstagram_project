// import { comments } from './pictures.js';
const filterButtons = document.querySelectorAll('.img-filters__button');

function filterClick() {
  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      if(button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      } else {
        filterButtons.forEach((item) => item.classList.remove('img-filters__button--active'));
        button.classList.add('img-filters__button--active');
      }
    });
  }
}

export {filterClick};
