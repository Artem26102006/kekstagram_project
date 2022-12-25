const body = document.querySelector('body');
const photoUploadForm = document.querySelector('.img-upload__form');
const photoFile = photoUploadForm.querySelector('#upload-file');
const photoOverlay = photoUploadForm.querySelector('.img-upload__overlay');
const photoPreview = photoUploadForm.querySelector('.img-upload__preview');
const photoEffectsPreview = photoUploadForm.querySelectorAll('.effects__preview');

photoFile.addEventListener('change', (evt) => {
  photoOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  const file = evt.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener('load', (ev) => {
    photoPreview.innerHTML = `<img src="${ev.target.result}">`;
    // photoPreview.insertAdjacentHTML('beforeend', `<img src="${ev.target.result}">`);
    photoEffectsPreview.forEach((item) => {
      item.style.backgroundImage = `url("${ev.target.result}")`;
    });
  });
});
