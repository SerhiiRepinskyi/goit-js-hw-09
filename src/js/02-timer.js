// Бібліотека flatpickr (описано в документації)
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів flatpickr
import 'flatpickr/dist/flatpickr.min.css';
// Бібліотека notiflix (Notify)
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timeInputPicker: document.querySelector('input#datetime-picker'),
  timerSpanValue: document.querySelectorAll('.timer span.value'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('.timer [data-days]'),
  hours: document.querySelector('.timer [data-hours]'),
  minutes: document.querySelector('.timer [data-minutes]'),
  seconds: document.querySelector('.timer [data-seconds]'),
};

let intervalId = null;
refs.btnStart.disabled = true;

const options = {
  enableTime: true, // вмикає засіб вибору часу
  time_24hr: true, // відображає засіб вибору часу в 24-годинному режимі
  defaultDate: new Date(), // встановлює початкову вибрану дату
  minuteIncrement: 1, // регулює крок для введення хвилин
  // функція, що запускається при закритті календаря
  onClose(selectedDates) {
    if (selectedDates[0] > new Date()) {
      Notify.success('Press START to start the countdown timer');
      refs.btnStart.disabled = false;
    } else {
      Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    }
  },
};

// const calendar = flatpickr('input#datetime-picker', options);
flatpickr('input#datetime-picker', options);

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.disabled = true;
  intervalId = setInterval(count, 1000);
});

function count() {
  // const endDate = calendar.selectedDates[0];
  const endTime = new Date(refs.timeInputPicker.value);
  const startTime = new Date();
  const countdown = endTime - startTime;
  // console.log(countdown);
  const countdownObj = convertMs(countdown);
  // console.log(countdownObj);

  if (countdown >= 0) {
    refs.days.textContent = addLeadingZero(countdownObj.days);
    refs.hours.textContent = addLeadingZero(countdownObj.hours);
    refs.minutes.textContent = addLeadingZero(countdownObj.minutes);
    refs.seconds.textContent = addLeadingZero(countdownObj.seconds);
    refs.timerSpanValue.forEach(elm => {
      elm.style.color = 'MediumSeaGreen';
    });
    if (countdown <= 11000) {
      refs.timerSpanValue.forEach(elm => {
        elm.style.color = 'tomato';
      });
    }
  } else {
    Notify.success('The countdown is complete! RELOAD the page!');
    clearInterval(intervalId);

    refs.timerSpanValue.forEach(elm => {
      elm.style.color = 'black';
    });
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days, hours, minutes and seconds
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
