import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('[data-start]');
  const daysSpan = document.querySelector('[data-days]');
  const hoursSpan = document.querySelector('[data-hours]');
  const minutesSpan = document.querySelector('[data-minutes]');
  const secondsSpan = document.querySelector('[data-seconds]');
  let userSelectedDate = null;
  let timerInterval = null;

  // Об'єкт параметрів для flatpickr
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]); // Виводить обрану дату в консоль
      if (selectedDates[0] <= new Date()) {
        iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
        startBtn.disabled = true;
      } else {
        userSelectedDate = selectedDates[0];
        startBtn.disabled = false;
      }
    },
  };

  // Ініціалізація Flatpickr з використанням об'єкта параметрів
  flatpickr("#datetime-picker", options);

  startBtn.addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const timeDifference = userSelectedDate - new Date();
      if (timeDifference <= 0) {
        clearInterval(timerInterval);
        iziToast.success({ title: 'Success', message: 'Countdown complete!' });
        resetTimer();
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      daysSpan.textContent = addLeadingZero(days);
      hoursSpan.textContent = addLeadingZero(hours);
      minutesSpan.textContent = addLeadingZero(minutes);
      secondsSpan.textContent = addLeadingZero(seconds);
    }, 1000);

    startBtn.disabled = true;
    document.querySelector('#datetime-picker').disabled = true;
  });

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

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function resetTimer() {
    startBtn.disabled = true;
    document.querySelector('#datetime-picker').disabled = false;
    daysSpan.textContent = "00";
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
  }
});
