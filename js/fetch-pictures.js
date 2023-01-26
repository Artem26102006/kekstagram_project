import { renderPictures } from './pictures.js';
import { pristine } from './validate-form.js';
import { onSuccess, onFail, showAlert } from './messages.js';

const photoForm = document.querySelector('.img-upload__form');
const buttonUpload = document.querySelector('#upload-submit');

function getPictures() {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }

      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((posts) => renderPictures(posts))
    .catch((err) => showAlert(`Ошибка ${err.message.slice(0,4)}`));
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
      }).catch(() => {
        closePhoto();
        onFail();
      });
    }
  });
};

export { getPictures, sendPictureForm };
