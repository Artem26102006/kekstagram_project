import { renderPictures } from './pictures.js';
import { pristine } from './validate-form.js';
import { onSuccess, onFail, showAlert } from './messages.js';
import { filterClick } from './filters-images.js';
import { discussedFilter, defaultFilter, randomFilter } from './filters-images.js';

const photoForm = document.querySelector('.img-upload__form');
const buttonUpload = document.querySelector('#upload-submit');
const filters = document.querySelector('.img-filters');

function publishButton() {
  buttonUpload.disabled = false;
  buttonUpload.textContent = 'Опубликовать';
}

function loadingButton() {
  buttonUpload.disabled = true;
  buttonUpload.textContent = 'Загружаем фото';
}

function getPictures() {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((posts) => {
      filters.classList.remove('img-filters--inactive');
      renderPictures(posts);
      filterClick();
      defaultFilter(posts);
      randomFilter(posts);
      discussedFilter(posts);
    })
    .catch((err) => showAlert(`Ошибка ${err.message.slice(0,4)}`));
}


function sendPictureForm(closePhoto) {
  photoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      loadingButton();
      const formData = new FormData(evt.target);

      fetch('https://25.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,
      }).then(() => {
        publishButton();
        closePhoto();
        onSuccess();
      }).catch(() => {
        publishButton();
        closePhoto();
        onFail();
      });
    }
  });
}

export { getPictures, sendPictureForm };
