const photoUploadForm = document.querySelector('.img-upload__form');
const hashtags = document.querySelector('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const UNVALID_SYMBOLS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(photoUploadForm, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const hashtagsCheck = () => {
  const isValidTag = (tag) => {
    if (UNVALID_SYMBOLS.test(tag)) {
      hashtags.style.outline = '';
      return true;
    } else {
      pristine.addError(hashtags, 'Некорректно введен хэш-тег');
      hashtags.style.outline = '2px solid red';
    }
  };

  const hasValidCount = (tags) => {
    if (tags.length <= MAX_HASHTAG_COUNT) {
      hashtags.style.outline = '';
      return true;
    } else {
      pristine.addError(hashtags, `Нельзя указывать больше ${MAX_HASHTAG_COUNT} хэш-тегов. Просьба удалить лишние`);
      hashtags.style.outline = '2px solid red';
    }
  };

  const hasUniceTags = (tags) => {
    const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
    if (lowerCaseTags.length === new Set(lowerCaseTags).size) {
      hashtags.style.outline = '';
      return true;
    } else {
      pristine.addError(hashtags, 'Пожалуйста, удалите повторяющиеся хэш-теги');
      hashtags.style.outline = '2px solid red';
    }
  };

  const validateTags = (value) => {
    const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
    if (hasValidCount(tags) && hasUniceTags(tags) && tags.every(isValidTag)) {
      hashtags.style.outline = '';
      return true;
    } else {
      return false;
    }
  };
  validateTags(hashtags.value);
};

export {hashtagsCheck, pristine};
