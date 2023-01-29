import { isEscapeKey } from './util.js';
import { pristine } from './validate-form.js';
import { photoFile } from './file-upload.js';
import {
  onScaleImgDecrease,
  onScaleImgIncrease,
  increaseButton,
  decreaseButton
} from './scale-control.js';
import { sendPictureForm } from './fetch-pictures.js';

const body = document.querySelector('body');
const photoUploadForm = document.querySelector('.img-upload__form');
const photoOverlay = document.querySelector('.img-upload__overlay');
const photo = document.querySelector('.img-upload__preview img');
const photosPreview = document.querySelectorAll('.effects__preview');
const closeButton = document.querySelector('#upload-cancel');
const textarea = document.querySelector('.text__description');
const hashtagsText = document.querySelector('.text__hashtags');
const sliderElementBlock = document.querySelector('.effect-level');
const valueElement = document.querySelector('.effect-level__value');

photoUploadForm.addEventListener('change', () => {
  openPhoto();
});

const scaleChange = () => {
  decreaseButton.addEventListener('click', onScaleImgDecrease);
  increaseButton.addEventListener('click', onScaleImgIncrease);
};

const isTextFieldFocused = () =>
  hashtagsText === document.activeElement ||
  textarea === document.activeElement;

const onEscKeydown = (evt) => {
  if (!isTextFieldFocused() && isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  } else {
    return evt;
  }
};

function openPhoto() {
  photoOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleChange();
  document.addEventListener('keydown', onEscKeydown);
}

function closePhoto() {
  photoOverlay.classList.add('hidden');
  sliderElementBlock.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUploadForm.reset();
  pristine.reset();
  photo.style = '';
  photo.classList.remove(photo.classList[0]);
  photosPreview.forEach((item) => {
    item.style = '';
  });
  textarea.value = '';
  hashtagsText.value = '';
  photoFile.value = '';
  valueElement.value = 100;
  decreaseButton.removeEventListener('click', onScaleImgDecrease);
  increaseButton.removeEventListener('click', onScaleImgIncrease);
  document.removeEventListener('keydown', onEscKeydown);
}

sendPictureForm(closePhoto);

closeButton.addEventListener('click', () => {
  closePhoto();
});

export {closePhoto};
