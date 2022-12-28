/* eslint-disable no-console */
import {isEscapeKey} from './util.js';
import {validateForm} from './validate-form.js';

const body = document.querySelector('body');
const photoUploadForm = document.querySelector('.img-upload__form');
const photoFile = photoUploadForm.querySelector('#upload-file');
const photoOverlay = photoUploadForm.querySelector('.img-upload__overlay');
const photoPreview = photoUploadForm.querySelector('.img-upload__preview');
const photoEffectsPreview = photoUploadForm.querySelectorAll('.effects__preview');
const closeButton = document.querySelector('#upload-cancel');
const textarea = document.querySelector('.text__description');
const counter = document.querySelector('.counter-block__dinamic-number');
const hashtags = document.querySelector('.text__hashtags');

const acceptPhtots = ['.jpg', '.jpeg', '.png', '.gif'];
if (acceptPhtots) {
  photoFile.setAttribute('accept', acceptPhtots.join(','));
}

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
  validateForm();
  textarea.addEventListener('input', () => {
    counter.textContent = textarea.value.length;
  });
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
    const decreaseButton = document.querySelector('.scale__control--smaller');
    const increaseButton = document.querySelector('.scale__control--bigger');
    const scaleValue = document.querySelector('.scale__control--value');
    const pictureScale = photoPreview.querySelector('img');
    const MAX_VALUE_COUNT = 100;

    scaleValue.value = `${MAX_VALUE_COUNT}%`;
    let valueScale = MAX_VALUE_COUNT;

    decreaseButton.addEventListener('click', () => {
      if (scaleValue.value === '25%') {
        pictureScale.style.transform = `scale(${scaleValue.value = 25}%)`;
        scaleValue.value = '25%';
      } else {
        pictureScale.style.transform = `scale(${scaleValue.value = valueScale -= 25}%)`;
        scaleValue.value = `${valueScale}%`;
      }
    });

    increaseButton.addEventListener('click', () => {
      if (scaleValue.value === '100%') {
        pictureScale.style.transform = `scale(${scaleValue.value = 100}%)`;
        scaleValue.value = '100%';
      } else {
        pictureScale.style.transform = `scale(${scaleValue.value = valueScale += 25}%)`;
        scaleValue.value = `${valueScale}%`;
      }
    });

    const sliderElement = document.querySelector('.effect-level__slider');
    const valueElement = document.querySelector('.effect-level__value');
    valueElement.style.display = 'block';
    valueElement.style.color = 'black';
    valueElement.value = 100;

    noUiSlider.create(sliderElement, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    });

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
    });

    const changeBackPicture = (picture) => {
      picture.addEventListener('click', () => {
        pictureScale.classList.remove(pictureScale.classList[0]);
        pictureScale.classList.add(picture.classList[1]);

        // console.log(typeof(picture.classList[1]));
      });
    };

    photoEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url("${ev.target.result}")`;
      changeBackPicture(item);
    });
  });

  reader.readAsDataURL(file);
});
