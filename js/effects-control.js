const photo = document.querySelector('.img-upload__preview img');
const sliderElementBlock = document.querySelector('.effect-level');
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

const changeBackPicture = (picture) => {
  sliderElementBlock.classList.add('hidden');
  photo.classList.remove(photo.classList[0]);

  picture.addEventListener('click', () => {
    photo.classList.remove(photo.classList[0]);
    photo.classList.add(picture.classList[1]);

    if (photo.classList[0] === 'effects__preview--chrome') {
      sliderElementBlock.classList.remove('hidden');
      sliderElement.noUiSlider.on('update', () => {
        valueElement.value = sliderElement.noUiSlider.get();
        photo.style.filter = `grayscale(${valueElement.value})`;
      });

      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (photo.classList[0] === 'effects__preview--sepia') {
      sliderElement.noUiSlider.on('update', () => {
        sliderElementBlock.classList.remove('hidden');
        valueElement.value = sliderElement.noUiSlider.get();
        photo.style.filter = `sepia(${valueElement.value})`;
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
      sliderElementBlock.classList.remove('hidden');
      sliderElement.noUiSlider.on('update', () => {
        valueElement.value = sliderElement.noUiSlider.get();
        photo.style.filter = `invert(${`${valueElement.value}%`})`;
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
      sliderElementBlock.classList.remove('hidden');
      sliderElement.noUiSlider.on('update', () => {
        valueElement.value = sliderElement.noUiSlider.get();
        photo.style.filter = `blur(${`${valueElement.value}px`})`;
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
      sliderElementBlock.classList.remove('hidden');
      sliderElement.noUiSlider.on('update', () => {
        valueElement.value = sliderElement.noUiSlider.get();
        photo.style.filter = `brightness(${valueElement.value})`;
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
      sliderElementBlock.classList.add('hidden');
      photo.style = '';
    }
  });
};

export {changeBackPicture};
