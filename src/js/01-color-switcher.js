const CHANGE_COLOR_DELAY = 1000;
let timerId = null;

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

// refs.btnStop.setAttribute('disabled', true);
refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onBtnStartChangeColor);
refs.btnStop.addEventListener('click', onBtnStopChangeColor);

function onBtnStartChangeColor() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    // const randomHexColor = getRandomHexColor();
    // getRgbColor(randomHexColor);
  }, CHANGE_COLOR_DELAY);
}

function onBtnStopChangeColor() {
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// function getRgbColor(hexColor) {
//   const red = parseInt(hexColor.substring(1, 3), 16);
//   const green = parseInt(hexColor.substring(3, 5), 16);
//   const blue = parseInt(hexColor.substring(5, 7), 16);

//   console.log(`Background-color: RGB(${red}, ${green}, ${blue})`);
// }
