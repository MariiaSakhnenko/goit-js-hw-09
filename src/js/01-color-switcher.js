const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');

let idInterval = null;

const onChangeColor = event => {
  onBtnDisabled();
  idInterval = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = `${color}`;
  }, 1000);
};

const onStopChangeColor = event => {
  clearInterval(idInterval);
  onBtnDisabled();
};
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnDisabled() {
  if (!btnStartRef.disabled) {
    btnStartRef.disabled = true;
    btnStopRef.disabled = false;
  } else {
    btnStartRef.disabled = false;
    btnStopRef.disabled = true;
  }
}

btnStartRef.addEventListener('click', onChangeColor);
btnStopRef.addEventListener('click', onStopChangeColor);
