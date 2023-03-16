import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartRef = document.querySelector('[data-start]');
const spanDaysRef = document.querySelector('[data-days]');
const spanHoursRef = document.querySelector('[data-hours]');
const spanMinutesf = document.querySelector('[data-minutes');
const spanSecondsRef = document.querySelector('[data-seconds]');

let msSelected = null;
let idInterval = null;

btnStartRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    msSelected = selectedDates[0].getTime();
    if (msSelected < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future.');
      return;
    }
    btnStartRef.classList.add('btn');
    btnStartRef.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

let object = {};

const onCountTime = () => {
  idInterval = setInterval(() => {
    const diff = msSelected - new Date().getTime();
    if (diff <= 0) {
      clearTimeout(idInterval);
      return;
    }
    object = convertMs(diff);
    onChangeContent(addLeadingZero(object));
  }, 1000);
};

function addLeadingZero(values) {
  const newValues = { ...values };
  const keys = Object.keys(newValues);
  for (const key of keys) {
    newValues[key] = String(newValues[key]).padStart(2, 0);
  }
  return newValues;
}

function onChangeContent({ days, hours, minutes, seconds }) {
  spanDaysRef.textContent = days;
  spanHoursRef.textContent = hours;
  spanMinutesf.textContent = minutes;
  spanSecondsRef.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

btnStartRef.addEventListener('click', onCountTime);
