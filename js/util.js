import { changeBackPicture } from './effects-control.js';

function getRandomNumber(a, b = 1) {
  if (a === undefined) {
    throw new Error('Первый параметр должен быть число');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getInfo(info) {
  return info[getRandomNumber(0, info.length - 1)];
}

function checkLengthString(string, length) {
  return string.length <= length;
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function onSuccess() {
  const body = document.querySelector('body');
  const photoOverlay = document.querySelector('.img-upload__overlay');
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
}

function onFail() {
  const body = document.querySelector('body');
  const photoOverlay = document.querySelector('.img-upload__overlay');
  const template = document.querySelector('#error').content;
  const errorMessage = template.querySelector('.error').cloneNode(false);
  const blockErrorMessage = template
    .querySelector('.error__inner')
    .cloneNode(true);
  blockErrorMessage.innerHTML = '';
  blockErrorMessage.innerHTML +=
    '<h2 class="error__title">Ошибка загрузки файла</h2>';
  blockErrorMessage.innerHTML += `<input type="file" id="error__button" class="img-upload__input
  visually-hidden" name="filename" required>
  <label for="error__button" class="error__button">Загрузить другой файл</label>`;
  const errorButton = blockErrorMessage.querySelector('#error__button');
  const photoEffectsPreview = document.querySelectorAll('.effects__preview');
  const photoPreview = document.querySelector('.img-upload__preview img');

  errorMessage.appendChild(blockErrorMessage);
  body.appendChild(errorMessage);

  errorButton.addEventListener('change', () => {
    errorMessage.remove();
    body.classList.add('modal-open');
    photoOverlay.classList.remove('hidden');
    const file = errorButton.files[0];
    photoPreview.src = URL.createObjectURL(file);
    photoEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url("${photoPreview.src}")`;
      changeBackPicture(item);
    });
  });

  errorMessage.addEventListener('click', (evt) => {
    const click = evt.composedPath().includes(blockErrorMessage);
    if (!click) {
      errorMessage.remove();
      body.classList.remove('modal-open');
      photoOverlay.classList.add('hidden');
    }
  });
}

export {
  getRandomNumber,
  getInfo,
  checkLengthString,
  isEscapeKey,
  onSuccess,
  onFail,
};
