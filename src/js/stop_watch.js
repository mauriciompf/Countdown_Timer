const timerButton = document.querySelector(".timer-btn");
const alarmButton = document.querySelector(".alarm-btn");
const stopwatchButton = document.querySelector(".stopwatch-btn");
const stopwatchWrap = document.querySelector(".stopwatch-wrap");
stopwatchButton.addEventListener("click", () => {
  timerButton.style.display = "none";
  alarmButton.style.display = "none";
  stopwatchButton.style.display = "none";
  stopwatchWrap.classList.add("active");
});

/* ---
--------------
--- */

const startButton = document.querySelector(".btn-start");
const resetButton = document.querySelector(".btn-reset");
const stopButton = document.querySelector(".btn-stop");
const counters = {
  sec: document.querySelector(".sec"),
  min: document.querySelector(".min"),
  hr: document.querySelector(".hr"),
};
const counterAll = document.querySelectorAll(".counter");
let intervalId;
const count = {
  sec: 0,
  min: 0,
  hr: 0,
};

function updateCounterElement(element, value) {
  element.textContent = value < 10 ? `0${value}` : value;
}

function startCounter() {
  intervalId = setInterval(() => {
    count.sec++;
    if (count.sec >= 60) {
      count.sec = 0;
      count.min++;
      if (count.min >= 60) {
        count.min = 0;
        count.hr++;
        updateCounterElement(counters.hr, count.hr);
      }
      updateCounterElement(counters.min, count.min);
    }
    updateCounterElement(counters.sec, count.sec);
  }, 1000);
}

function resetCounter() {
  for (const counter of counterAll) {
    counter.textContent = "00";
  }
  clearInterval(intervalId);
}

function stopCounter() {
  clearInterval(intervalId);
}

startButton.addEventListener("click", () => {
  startCounter();
  updateCounterElement(counters.sec, count.sec);
  startButton.disabled = true;
  startButton.classList.add("disabled-button");
});

stopButton.addEventListener("click", () => {
  stopCounter();
  startButton.disabled = false;
  startButton.classList.remove("disabled-button");
});

resetButton.addEventListener("click", () => {
  resetCounter();
  startButton.disabled = false;
  startButton.classList.remove("disabled-button");
});
