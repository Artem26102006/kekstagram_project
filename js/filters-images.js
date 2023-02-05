import { renderPictures } from './pictures.js';
import { debounce } from './util.js';

const filterButtons = document.querySelectorAll('.img-filters__button');
const filtersContainer = document.querySelector('.img-filters__form');
const filters = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};
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
  function changeFilter(evt) {
    const currentFilter = evt.target;
    if (currentFilter.id === filters.default) {
      const pictures = document.querySelectorAll('.picture');
      const listOfPictures = [...img];
      pictures.forEach((item) => item.remove());
      renderPictures(listOfPictures);
    } else if (currentFilter.id === filters.random) {
      const pictures = document.querySelectorAll('.picture');
      const listOfPictures = [...img];
      listOfPictures.sort(randomSort);
      pictures.forEach((item) => item.remove());
      renderPictures(listOfPictures.slice(0, 10));
    } else if (currentFilter.id === filters.discussed) {
      const pictures = document.querySelectorAll('.picture');
      const listOfPictures = [...img];
      listOfPictures.sort((a, b) => b.comments.length - a.comments.length);
      pictures.forEach((item) => item.remove());
      renderPictures(listOfPictures);
    }
  }

  const debouncedChange = debounce(changeFilter, 500);
  filtersContainer.addEventListener('click', debouncedChange);
}


export { filterClick, filtersImg };
