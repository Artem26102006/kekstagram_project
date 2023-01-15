import { renderPictures } from './pictures.js';
import { pristine } from './validate-form.js';

const photoForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const photoOverlay = document.querySelector('.img-upload__overlay');
const buttonUpload = document.querySelector('#upload-submit');

const onSuccess = () => {
  const template = document.querySelector('#success').content;
  const successMessage = template.querySelector('.success').cloneNode(true);
  const blockSuccessMessage = successMessage.querySelector('.success__inner');
  const buttonSuccessMessage = successMessage.querySelector('.success__button');
  body.appendChild(successMessage);

  buttonSuccessMessage.addEventListener('click', () => {
    successMessage.remove();
    body.classList.remove('modal-open');
    photoOverlay.classList.add('hidden');
  });

  successMessage.addEventListener('click', (evt) => {
    const click = evt.composedPath().includes(blockSuccessMessage);
    if (!click) {
      successMessage.remove();
      body.classList.remove('modal-open');
      photoOverlay.classList.add('hidden');
    }
  });
};

function getPictures() {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((posts) => renderPictures(posts));
}

const sendPictureForm = (closePhoto) => {
  photoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    buttonUpload.disabled = true;
    buttonUpload.textContent = 'Загружаем фото';
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch('https://25.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,
      }).then(() => {
        buttonUpload.disabled = false;
        buttonUpload.textContent = 'Опубликовать';
        closePhoto();
        onSuccess();
      });
    }
  });
};

export { getPictures, sendPictureForm };
