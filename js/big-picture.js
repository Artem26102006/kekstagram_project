const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');

// const createSocialComment = () => {
//   const comment = `
//     <li class="social__comment">
//       <img
//         class="social__picture"
//         src="${this.comments.avatar}"
//         alt=${this.comments.name}"
//         width="35" height="35">
//       <p class="social__text">${this.comments.message}</p>
//     </li>`;
//   return comment;
// };
const bigPictureSocialCountComments = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
bigPictureSocialCountComments.classList.add('hidden');
bigPictureCommentsLoader.classList.add('hidden');

const renderPictureDetails = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureComments = bigPicture.querySelector('.social__comments');
  const bigPictureCountComments = bigPicture.querySelector('.comments-count');
  const bigPictureDescrip = bigPicture.querySelector('.social__caption');
  const comments = data.comments;
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
  bigPictureImg.src = data.url;
  bigPictureLikes.textContent = data.likes;
  bigPictureCountComments.textContent = data.comments.length;
  bigPictureDescrip.textContent = data.description;
};

export {renderPictureDetails};
