/* eslint-disable no-console */
import {isEscapeKey} from './util.js';
const body = document.querySelector('body');
const photoUploadForm = document.querySelector('.img-upload__form');
const photoFile = photoUploadForm.querySelector('#upload-file');
const photoOverlay = photoUploadForm.querySelector('.img-upload__overlay');
const photoPreview = photoUploadForm.querySelector('.img-upload__preview');
const photoEffectsPreview = photoUploadForm.querySelectorAll('.effects__preview');
const closeButton = document.querySelector('#upload-cancel');
// const buttonSubmit = document.querySelector('#upload-submit');
const textarea = document.querySelector('.text__description');
const counter = document.querySelector('.counter-block__dinamic-number');
const hashtags = document.querySelector('.text__hashtags');

const acceptPhtots = ['.jpg', '.jpeg', '.png', '.gif'];
if (acceptPhtots) {
  photoFile.setAttribute('accept', acceptPhtots.join(','));
}

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const startsWithHash = (string) => string[0] === '#';
const hasSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));
const lengthHashtag = (string) => string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const isValidTag = (tag) => startsWithHash(tag) && hasSymbols(tag) && lengthHashtag(tag);
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;
const hasUniceTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniceTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtags,
  validateTags,
  'Неправильно заполнены хэштеги'
);

textarea.addEventListener('input', () => {
  counter.textContent = textarea.value.length;
});

const isTextFieldFocused = () => hashtags === document.activeElement || textarea === document.activeElement;

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
  document.addEventListener('keydown', onEscKeydown);
}

function closePhoto() {
  photoOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUploadForm.reset();
  document.removeEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', () => {
  closePhoto();
});

photoFile.addEventListener('change', (evt) => {
  openPhoto();
  const file = evt.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (ev) => {
    photoPreview.innerHTML = `<img src="${ev.target.result}">`;
    photoEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url("${ev.target.result}")`;
    });
  });

  reader.readAsDataURL(file);
});
