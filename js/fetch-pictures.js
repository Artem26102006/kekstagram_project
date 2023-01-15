import { renderPictures } from './pictures.js';
import { pristine } from './validate-form.js';

const photoForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const photoOverlay = document.querySelector('.img-upload__overlay');

const onSuccess = () => {
  const template = document.querySelector('#success').content;
  const successMessage = template.querySelector('.success');
  const blockSuccessMessage = successMessage.querySelector('.success__inner');
  body.appendChild(successMessage);
  successMessage.addEventListener('click', (evt) => {
    const click = evt.composedPath().includes(blockSuccessMessage);
    if (!click) {
      successMessage.classList.add('hidden');
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
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch('https://25.javascript.pages.academy/kekstagram', {
        method: 'POST',
        body: formData,
      }).then(() => {
        closePhoto();
        onSuccess();
      });
    }
  });
};

export { getPictures, sendPictureForm };
