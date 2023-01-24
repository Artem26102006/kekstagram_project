function getRandomNumber(a, b = 1) {
  if (a === undefined) {
    throw new Error('Первый параметр должен быть число');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getInfo(info) {
  return info[getRandomNumber(0, info.length - 1)];
}

function checkLengthString(string, length) {
  return string.length <= length;
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export {
  getRandomNumber,
  getInfo,
  checkLengthString,
  isEscapeKey
};
