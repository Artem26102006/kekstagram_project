/* eslint-disable no-console */
// import { getPosts } from './data.js';
import { renderPictures } from './pictures.js';
import './picture-form.js';
// renderPictures(getPosts());

fetch('https://25.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((posts) => renderPictures(posts))
  .catch((error) => console.log(error));
