import {getRandomNumber, getInfo} from './util.js';

const commentLines = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const descriptions = [
  'Летний чил на югах. #тай #отдых #лето #чил #travel #travelgram #summergram #chill',
  'Тестим новую камеру! #camera #test #new #newcameratest #pic #photo #instaphoto',
  'Затусили с друзьями на море #laptevsea #north #northeastpassage',
  'Как же круто тут кормят #food #foodgram #instafood #delicious #yummy',
  'Отдыхаем... #chill #relax #group #photo',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка! #wow #car #carwow #drive',
  '#fun #party #cool #young',
  'Господи, это такая милота, я сейчас умру от нежности, у меня закшалил мимимиметр',
  'Хорошо, когда в жизни есть #друзья, которые вместе со мной могут зайти в #барнарубинштейна и бахнуть #пивка',
  'Норм',
];

const names = ['Николай', 'Аким', 'Ким', 'Харитон', 'Тимур', 'Степан'];

function createComment(i) {
  return {
    id: i,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getInfo(commentLines),
    name: getInfo(names),
  };
}

function createPost(i) {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: getInfo(descriptions),
    likes: getRandomNumber(15, 200),
    comments: Array.from(
      { length: getRandomNumber(0, 15) },
      (_, commentIndex) => createComment(commentIndex + 1)
    ),
  };
}

const getPosts = () => Array.from({length: 25}, (_, pictureIndex) => createPost(pictureIndex + 1));

export {getPosts};
