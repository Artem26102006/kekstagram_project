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
const hashtags = document.querySelector('.text__hashtags');
const fieldSlider = document.querySelector('.img-upload__effect-level');

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
  document.addEventListener('keydown', onEscKeydown);
}

function closePhoto() {
  photoOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  fieldSlider.classList.add('hidden');
  photoUploadForm.reset();
  document.removeEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', () => {
  closePhoto();
});

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
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

photoFile.addEventListener('change', (evt) => {
  openPhoto();
  const file = evt.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', (ev) => {
    photoPreview.innerHTML = `<img src="${ev.target.result}">`;
    const currentPicture = photoPreview.querySelector('img');

    const changeBackPicture = (picture) => {
      currentPicture.classList.add('effects__preview--none');
      if (picture.classList[1] === 'effects__preview--none') {
        fieldSlider.classList.add('hidden');
      }
      picture.addEventListener('click', () => {
        currentPicture.classList.remove(currentPicture.classList[0]);
        currentPicture.classList.add(picture.classList[1]);

        if (picture.classList[1] === 'effects__preview--chrome') {
          fieldSlider.classList.remove('hidden');
          sliderElement.noUiSlider.on('update', () => {
            valueElement.value = sliderElement.noUiSlider.get();
            currentPicture.style.filter = `grayscale(${valueElement.value})`;
          });

          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
        } else if (picture.classList[1] === 'effects__preview--sepia') {
          fieldSlider.classList.remove('hidden');
          sliderElement.noUiSlider.on('update', () => {
            valueElement.value = sliderElement.noUiSlider.get();
            currentPicture.style.filter = `sepia(${valueElement.value})`;
          });

          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
        } else if (picture.classList[1] === 'effects__preview--marvin') {
          fieldSlider.classList.remove('hidden');
          sliderElement.noUiSlider.on('update', () => {
            valueElement.value = sliderElement.noUiSlider.get();
            currentPicture.style.filter = `invert(${`${valueElement.value}%`})`;
          });

          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
        } else if (picture.classList[1] === 'effects__preview--phobos') {
          fieldSlider.classList.remove('hidden');
          sliderElement.noUiSlider.on('update', () => {
            valueElement.value = sliderElement.noUiSlider.get();
            currentPicture.style.filter = `blur(${`${valueElement.value}px`})`;
          });

          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
        } else if (picture.classList[1] === 'effects__preview--heat') {
          fieldSlider.classList.remove('hidden');
          sliderElement.noUiSlider.on('update', () => {
            valueElement.value = sliderElement.noUiSlider.get();
            currentPicture.style.filter = `brightness(${valueElement.value})`;
          });

          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
        } else if (picture.classList[1] === 'effects__preview--none') {
          fieldSlider.classList.add('hidden');
          currentPicture.style = '';
        }
        console.log(valueElement.value);
      });
    };

    photoEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url("${ev.target.result}")`;
      changeBackPicture(item);
    });
  });

  reader.readAsDataURL(file);
});
