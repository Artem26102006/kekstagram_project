const scaleControls = document.querySelector('.img-upload__scale');
const decreaseButton = scaleControls.querySelector('.scale__control--smaller');
const increaseButton = scaleControls.querySelector('.scale__control--bigger');
const scaleControlValue = scaleControls.querySelector('.scale__control--value');
const picture = document.querySelector('.img-upload__preview img');
const DIVISOR = 100;
const MIN = 25;
const MAX = 100;
const STEP = 25;

const onScaleImgDecrease = () => {
  let sizeScale = parseFloat(scaleControlValue.value, 10);
  if (sizeScale === MIN) {
    return false;
  }
  sizeScale -= STEP;
  scaleControlValue.value = `${sizeScale}%`;
  picture.style.transform = `scale(${sizeScale / DIVISOR})`;
};

const onScaleImgIncrease = () => {
  let sizeScale = parseFloat(scaleControlValue.value, 10);
  if (sizeScale === MAX) {
    return false;
  }
  sizeScale += STEP;
  scaleControlValue.value = `${sizeScale}%`;
  picture.style.transform = `scale(${sizeScale / DIVISOR})`;
};

export {onScaleImgDecrease, onScaleImgIncrease, decreaseButton, increaseButton};
