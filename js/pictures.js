import {renderBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const renderPictures = function(list) {
  list.forEach((post) => {
    const postTemplateClone = pictureTemplate.cloneNode(true);
    const postImgClone = postTemplateClone.querySelector('.picture__img');
    const postCommentsClone = postTemplateClone.querySelector('.picture__comments');
    const postLikesClone = postTemplateClone.querySelector('.picture__likes');
    postImgClone.src = post.url;
    postCommentsClone.textContent = post.comments.length;
    postLikesClone.textContent = post.likes;
    postTemplateClone.addEventListener('click', () => {
      renderBigPicture(post);
    });
    picturesFragment.appendChild(postTemplateClone);
  });
  picturesContainer.appendChild(picturesFragment);
};

export {renderPictures};
