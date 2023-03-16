import Notiflix from 'notiflix';

const refs = {
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
  formEl: document.querySelector('.form'),
};

refs.formEl.addEventListener('submit', start);

function start(evt) {
  evt.preventDefault();

  const AMOUNT = refs.amountEl.value;
  const DELAY = refs.delayEl.value;
  const STEP = refs.stepEl.value;

  let delay = Number(DELAY);

  for (let position = 1; position <= AMOUNT; position += 1) {
    createPromise({ position, delay })
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );

    delay += Number(STEP);
  }
}

const createPromise = ({ position, delay }) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
};
