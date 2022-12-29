import { changeBackPicture } from './effects-control.js';

const photoFile = document.querySelector('#upload-file');
const photoEffectsPreview = document.querySelectorAll('.effects__preview');
const photoPreview = document.querySelector('.img-upload__preview img');
const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.gif'];
photoFile.setAttribute('accept', FILE_TYPES.join(','));

photoFile.addEventListener('change', () => {
  const file = photoFile.files[0];
  photoPreview.src = URL.createObjectURL(file);
  photoEffectsPreview.forEach((item) => {
    item.style.backgroundImage = `url("${photoPreview.src}")`;
    changeBackPicture(item);
  });
});

export {photoFile};
