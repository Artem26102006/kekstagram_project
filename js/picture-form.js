/* eslint-disable no-console */
import {isEscapeKey} from './util.js';
import {checkHashtags, pristine} from './validate-form.js';
import {photoFile} from './file-upload.js';
import { onScaleImgDecrease, onScaleImgIncrease, increaseButton, decreaseButton, picture } from './scale-control.js';

const body = document.querySelector('body');
const photoUploadForm = document.querySelector('.img-upload__form');
const photoOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const textarea = document.querySelector('.text__description');
const hashtagsText = document.querySelector('.text__hashtags');
const sliderElementBlock = document.querySelector('.effect-level');

photoUploadForm.addEventListener('change', () => {
  openPhoto();
});

const scaleChange = () => {
  decreaseButton.addEventListener('click', onScaleImgDecrease);
  increaseButton.addEventListener('click', onScaleImgIncrease);
};

const isTextFieldFocused = () => hashtagsText === document.activeElement || textarea === document.activeElement;

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
  hashtagsText.addEventListener('input', checkHashtags);
  scaleChange();
  document.addEventListener('keydown', onEscKeydown);
}

function closePhoto() {
  photoOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUploadForm.reset();
  textarea.value = '';
  hashtagsText.value = '';
  hashtagsText.style.outline = '';
  hashtagsText.removeEventListener('input', checkHashtags);
  pristine.reset();
  decreaseButton.addEventListener('click', onScaleImgDecrease);
  increaseButton.addEventListener('click', onScaleImgIncrease);
  picture.style.transform = '';
  photoFile.value = '';
  sliderElementBlock.classList.remove('hidden');
  document.removeEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', () => {
  closePhoto();
});
