const PHOTO_COUNT = 25;
const NAMES = [
  'Анна',
  'Софья',
  'Александр',
  'Даниил',
  'Евгений',
  'Ангелина',
  'Илья',
  'Стефания',
  'Богдан',
  'Артём',
];
const DESCRIPTIONS = Array.from({length: PHOTO_COUNT}, (_, i) => 'Описание ${i}');
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const COMMENT_ID = [];
const isCorrectLength = (str, maxLength) => str.length <= maxLength;
const getRandomLikes = () => getRandomIntInclusive(15, 200);
const getRandomElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length-1)];
};

function getRandomIntInclusive(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// имя_функции(проверяемая_строка, максимальная_длина); // Результат: true, если строка проходит по длине, и false — если не проходит
function checkStringLength (string, length) {
  return string.length <= length;
}

const getID = (() => {
  let id = 1;
  return () => id++;
}) ();

function getCommentID() {
  const ID = getRandomIntInclusive(1, 1000);
  while (COMMENT_ID.includes(id)) {
    id = getRandomIntInclusive(1, 1000);
  }
  return id;
};

function generateComment() {
  const messageText = [];
  for (let i = 0; i < getRandomIntInclusive(1,2); i++) {
    messageText.push(getRandomElement(MESSAGE));
  }
return {
  id: getCommentID(),
  avatar: 'img/avatar-${getRandomIntInclusive(1, 6)}.svg',
  message: messageText.join(''),
  name: getRandomElement(NAMES)
  };
};

function generateDescription() {
  const comments = Array.from({length: getRandomIntInclusive(0, 3), generateComment});
  const id = getID();
  return {
    id: id,
    url: 'photos/${id}.jpg',
    descriptions: DESCRIPTIONS[id-1],
    likes: getRandomLikes(),
    comments: comments
  };
}

const descriptions = Array.from({length: PHOTO_COUNT}, generateDescription);

isCorrectLength(descriptions, PHOTO_COUNT);
