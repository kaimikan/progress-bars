const FULL_DASH_ARRAY = 339.292; // 2 * PI * r, where r is the radius of the circle (54)
let hours = 0;
let minutes = 1;
let seconds = 0;

let timeLimit = hours * 60 * 60 + minutes * 60 + seconds; // total countdown time in seconds
let timePassed = 0;
let timeLeft = timeLimit;
let timerInterval = null;
let isPaused = true;
let hasStarted = false;

const timeDisplay = document.querySelector('.time-display');
const progressCircle = document.querySelector('.progress-ring__circle');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// Set up the initial circle dash array
progressCircle.style.strokeDasharray = FULL_DASH_ARRAY;
progressCircle.style.strokeDashoffset = 0;

function startTimer() {
  isPaused = false;
  hasStarted = true;
  timerInterval = setInterval(() => {
    if (!isPaused) {
      timePassed++;
      timeLeft = timeLimit - timePassed;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timeLeft = 0;
      }

      updateDisplay();
      setCircleProgress();
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

function setCircleProgress() {
  const offset = FULL_DASH_ARRAY - (timePassed / timeLimit) * FULL_DASH_ARRAY;
  progressCircle.style.strokeDashoffset = offset;
}

function pauseTimer() {
  isPaused = !isPaused;
  isPaused ? (pauseBtn.innerHTML = 'Resume') : (pauseBtn.innerHTML = 'Pause');
}

function resetTimer() {
  clearInterval(timerInterval);
  timePassed = 0;
  timeLeft = timeLimit;
  updateDisplay();
  setCircleProgress();
  isPaused = true;
  hasStarted = false;
  startBtn.disabled = false;
}

startBtn.addEventListener('click', () => {
  if (!hasStarted) {
    startTimer();
    startBtn.disabled = true;
  }
});

pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Initialize display
updateDisplay();
