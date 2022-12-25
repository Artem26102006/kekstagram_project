import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
// const bigPictureSocialCountComments = bigPicture.querySelector('.social__comment-count');
const buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');
const bigPictureComments = bigPicture.querySelector('.social__comments');

const addComment = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    fragment.appendChild(commentElement);
  });
  bigPictureComments.innerHTML = '';
  bigPictureComments.appendChild(fragment);
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

const bigPictureDetailes = ({url, likes, comments, description}) => {
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureCountComments = bigPicture.querySelector('.comments-count');
  const bigPictureDescrip = bigPicture.querySelector('.social__caption');
  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCountComments.textContent = comments.length;
  bigPictureDescrip.textContent = description;
};

const renderBigPicture = (data) => {
  openBigPicture();
  bigPictureDetailes(data);
  addComment(data.comments);
};

export {renderBigPicture};
