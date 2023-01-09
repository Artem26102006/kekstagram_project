import { pristine } from './validate-form.js';
const photoForm = document.querySelector('.img-upload__form');
const sendPictureForm = (onSuccess) => {
  photoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch(
        'https://25.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      ).then(() => onSuccess());
    }
  });
};

export {sendPictureForm};
