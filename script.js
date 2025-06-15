// Звуки
const spinSound = new Audio('sounds/spin.mp3');
const selectSound = new Audio('sounds/select.mp3');
const sparkleSound = new Audio('sounds/sparkle.mp3');
spinSound.loop = true;

const shapes = [
  { name: 'Миндаль', img: 'images/shapes/almond.png' },
  { name: 'Квадрат', img: 'images/shapes/square.png' },
  { name: 'Овал', img: 'images/shapes/oval.png' },
  { name: 'Балерина', img: 'images/shapes/ballerina.png' },
  { name: 'Стилет', img: 'images/shapes/stiletto.png' }
];

const designs = [
  { name: 'Френч', img: 'images/designs/french.png' },
  { name: 'Глиттер', img: 'images/designs/glitter.png' },
  { name: 'Минимализм', img: 'images/designs/minimalism.png' },
  { name: 'Градиент', img: 'images/designs/gradient.png' },
  { name: 'Абстракция', img: 'images/designs/abstract.png' }
];

const colors = [
  { name: 'Красный', img: 'images/colors/red.png' },
  { name: 'Синий', img: 'images/colors/blue.png' },
  { name: 'Нюд', img: 'images/colors/nude.png' },
  { name: 'Чёрный', img: 'images/colors/black.png' },
  { name: 'Белый', img: 'images/colors/white.png' }
];

const lengths = [
  { name: '1', img: 'images/lengths/1.png' },
  { name: '2', img: 'images/lengths/2.png' },
  { name: '3', img: 'images/lengths/3.png' },
  { name: '4', img: 'images/lengths/4.png' },
  { name: '5', img: 'images/lengths/5.png' },
  { name: '6', img: 'images/lengths/6.png' },
  { name: '7', img: 'images/lengths/7.png' },
  { name: 'Extra', img: 'images/lengths/extra.png' }
];

const colorMap = {
  'Красный': 'red',
  'Синий': 'blue',
  'Нюд': '#d2b48c',
  'Чёрный': 'black',
  'Белый': 'gray'
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function spin() {
  const shapeEl = document.getElementById('shape');
  const shapeImg = document.getElementById('shape-img');
  const designEl = document.getElementById('design');
  const designImg = document.getElementById('design-img');
  const colorEl = document.getElementById('color');
  const colorImg = document.getElementById('color-img');
  const lengthEl = document.getElementById('length');
  const lengthImg = document.getElementById('length-img');
  const resultEl = document.getElementById('result');
  const pinterestLinkEl = document.getElementById('pinterest-link');

  resultEl.classList.remove('show');
  resultEl.textContent = '';
  pinterestLinkEl.innerHTML = '';

  // Запуск звука вращения
  spinSound.currentTime = 0;
  spinSound.play();

  const interval = setInterval(() => {
    shapeEl.textContent = getRandomItem(shapes).name;
    shapeImg.src = getRandomItem(shapes).img;

    designEl.textContent = getRandomItem(designs).name;
    designImg.src = getRandomItem(designs).img;

    colorEl.textContent = getRandomItem(colors).name;
    colorImg.src = getRandomItem(colors).img;

    lengthEl.textContent = getRandomItem(lengths).name;
    lengthImg.src = getRandomItem(lengths).img;
  }, 100);

  // Через 2 секунды — остановка рулетки
  setTimeout(() => {
    clearInterval(interval);
    spinSound.pause();
    spinSound.currentTime = 0;

    const finalShape = getRandomItem(shapes);
    const finalDesign = getRandomItem(designs);
    const finalColor = getRandomItem(colors);
    const finalLength = getRandomItem(lengths);

    shapeEl.textContent = finalShape.name;
    shapeImg.src = finalShape.img;

    designEl.textContent = finalDesign.name;
    designImg.src = finalDesign.img;

    colorEl.textContent = finalColor.name;
    colorImg.src = finalColor.img;

    lengthEl.textContent = finalLength.name;
    lengthImg.src = finalLength.img;

    const cssColor = colorMap[finalColor.name] || 'black';

    resultEl.innerHTML = `<strong>Ваш выбор:</strong> ${finalShape.name} форма, длина ${finalLength.name}, ${finalDesign.name} дизайн, <span style="color: ${cssColor}; font-weight: bold;">${finalColor.name}</span> цвет 💅`;
    resultEl.classList.add('show');

    // Звук выбора
    selectSound.currentTime = 0;
    selectSound.play();

    const query = `маникюр ${finalShape.name} ${finalDesign.name} ${finalColor.name}`;
    const pinterestUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;

    const link = document.createElement('a');
    link.href = pinterestUrl;
    link.target = '_blank';
    link.textContent = '📌 Посмотреть примеры в Pinterest';
    link.className = 'pinterest-link';
    pinterestLinkEl.appendChild(link);

    // Через 1 секунду — фейерверк и звук sparkle
    setTimeout(() => {
      sparkleSound.currentTime = 0;
      sparkleSound.play();
      launchParticles();
    }, 1000);

  }, 2000); // рулетка крутится 2 секунды
}

function launchParticles() {
  const container = document.getElementById('particles-container');
  container.innerHTML = '';

  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (6 + Math.random() * 6) + 'px';
    p.style.height = p.style.width;
    p.style.background = `radial-gradient(circle, hsl(${Math.random()*360}, 100%, 70%), transparent)`;
    p.style.animationDuration = (3 + Math.random() * 2) + 's';
    container.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }

  const flash = document.createElement('div');
  flash.className = 'flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1000);

  for (let i = 0; i < 40; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  }

  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 2000);
  }
}
