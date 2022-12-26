import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const countComments = bigPicture.querySelector('.social__comment-count');
const buttonCommentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsPicture = bigPicture.querySelector('.social__comments');

const COMMENTS_PER_PORTION = 5;
let commentsShown = 0;
let commentsList = [];

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.innerHTML =
    '<img class="social__picture" src="" alt="" width="35" height="35"><p class="social__text"></p>';
  comment.classList.add('social__comment');

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= commentsList.length) {
    buttonCommentsLoader.classList.add('hidden');
    commentsShown = commentsList.length;
  } else {
    buttonCommentsLoader.classList.remove('hidden');
  }
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(commentsList[i]);
    fragment.appendChild(commentElement);
  }
  commentsPicture.innerHTML = '';
  commentsPicture.appendChild(fragment);
  countComments.innerHTML = `${commentsShown} из <span class="comments-count">${commentsList.length}</span> комментариев`;
};


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
  commentsList = data.comments;
  if (commentsList.length > 0) {
    renderComments();
  }
};

buttonCommentsLoader.addEventListener('click', () => {
  renderComments();
});

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
  commentsShown = 0;
  document.removeEventListener('keydown', onEscKeydown);
}

closeButton.addEventListener('click', () => {
  closeBigPicture();
});

export {renderBigPicture};
