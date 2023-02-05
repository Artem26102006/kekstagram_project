import { renderPictures } from './pictures.js';
// import { debounce } from './util.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const randomSort = () => Math.random() - 0.5;

function filterClick() {
  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      if (button.classList.contains('img-filters__button--active')) {
        return true;
      } else {
        filterButtons.forEach((item) =>
          item.classList.remove('img-filters__button--active')
        );
        button.classList.add('img-filters__button--active');
      }
    });
  }
}

function filtersImg(img) {
  filterDefault.addEventListener('click', () => {
    const pictures = document.querySelectorAll('.picture');
    const listOfPictures = [...img];
    pictures.forEach((item) => item.remove());
    renderPictures(listOfPictures);
  });

  filterRandom.addEventListener('click', () => {
    const pictures = document.querySelectorAll('.picture');
    const listOfPictures = [...img];
    listOfPictures.sort(randomSort);
    pictures.forEach((item) => item.remove());
    renderPictures(listOfPictures.slice(0, 10));
  });

  filterDiscussed.addEventListener('click', () => {
    const pictures = document.querySelectorAll('.picture');
    const listOfPictures = [...img];
    listOfPictures.sort((a, b) => b.comments.length - a.comments.length);
    pictures.forEach((item) => item.remove());
    renderPictures(listOfPictures);
  });
}

// function defaultFilter(img) {
//   filterDefault.addEventListener('click', () => {
//     const pictures = document.querySelectorAll('.picture');
//     const listOfPictures = [...img];
//     pictures.forEach((item) => item.remove());
//     renderPictures(listOfPictures);
//   });
// }

// function randomFilter(img) {
//   filterRandom.addEventListener('click', () => {
//     const pictures = document.querySelectorAll('.picture');
//     const listOfPictures = [...img];
//     listOfPictures.sort(randomSort);
//     pictures.forEach((item) => item.remove());
//     renderPictures(listOfPictures.slice(0, 10));
//   });
// }

// function discussedFilter(img) {
//   filterDiscussed.addEventListener('click', () => {
//     const pictures = document.querySelectorAll('.picture');
//     const listOfPictures = [...img];
//     listOfPictures.sort((a, b) => b.comments.length - a.comments.length);
//     pictures.forEach((item) => item.remove());
//     renderPictures(listOfPictures);
//   });
// }

export { filterClick, filtersImg };
