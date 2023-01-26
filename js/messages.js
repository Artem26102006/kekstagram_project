const body = document.querySelector('body');
const photoOverlay = document.querySelector('.img-upload__overlay');

function hideMessage() {
  const messageElement =
    document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  body.classList.remove('modal-open');
  photoOverlay.classList.add('hidden');
}


function onSuccess() {
  const template = document.querySelector('#success').content;
  const successMessage = template.querySelector('.success').cloneNode(true);
  const blockSuccessMessage = successMessage.querySelector('.success__inner');
  const buttonSuccessMessage = successMessage.querySelector('.success__button');
  body.append(successMessage);

  buttonSuccessMessage.addEventListener('click', () => {
    hideMessage();
  });

  successMessage.addEventListener('click', (evt) => {
    const click = evt.composedPath().includes(blockSuccessMessage);
    if (!click) {
      hideMessage();
    }
  });
}

function onFail() {
  const template = document.querySelector('#error').content;
  const errorMessage = template.querySelector('.error').cloneNode(true);
  const blockErrorMessage = errorMessage.querySelector('.error__inner');
  const buttonErrorMessage = errorMessage.querySelector('.error__button');
  body.append(errorMessage);

  buttonErrorMessage.addEventListener('click', () => {
    hideMessage();
  });

  errorMessage.addEventListener('click', (evt) => {
    const click = evt.composedPath().includes(blockErrorMessage);
    if (!click) {
      hideMessage();
    }
  });
}

const showAlert = (text) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.style.backgroundColor = 'red';
  alert.textContent = text;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
};

export {onSuccess, onFail, showAlert};
