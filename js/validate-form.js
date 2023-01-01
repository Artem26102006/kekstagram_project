const photoUploadForm = document.querySelector('.img-upload__form');
const hashtags = document.querySelector('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const UNVALID_SYMBOLS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const isValidTag = (tag) => UNVALID_SYMBOLS.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniceTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return (hasValidCount(tags) && hasUniceTags(tags) && tags.every(isValidTag));
};

pristine.addValidator(
  hashtags,
  validateTags,
  'Неправильно заполнены хэштеги'
);

export {pristine};
