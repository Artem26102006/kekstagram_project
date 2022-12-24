import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureSocialCountComments = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');
bigPictureSocialCountComments.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');

const addComment = (item) => {
  const bigPictureComments = bigPicture.querySelector('.social__comments');
  const comments = item.comments;
  bigPictureComments.innerHTML = '';
  for (let i = 0; i < comments.length; i++) {
    bigPictureComments.insertAdjacentHTML('beforeend',
      `<li class="social__comment">
        <img
          class="social__picture"
          src="${comments[i].avatar}"
          alt="${comments[i].name}"
          width="35" height="35">
        <p class="social__text">${comments[i].message}</p>
      </li>`
    );
  }
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

const renderBigPicture = (data) => {
  openBigPicture();
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureCountComments = bigPicture.querySelector('.comments-count');
  const bigPictureDescrip = bigPicture.querySelector('.social__caption');
  bigPictureImg.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureCountComments.textContent = data.comments.length;
  bigPictureDescrip.textContent = data.description;
  addComment(data);
};

export {renderBigPicture};
