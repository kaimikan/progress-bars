// TODO make into OOP
class HourlyBars {
  constructor(container, duration) {
    this.container = container;
    this.totalHours = duration;
    this.timePassed = 0;
    this.timeLimit = this.totalHours * 60 * 60;
    this.timeLeft = this.timeLimit;
    this.timerInterval = null;
    this.isPaused = true;
    this.hasStarted = false;
    this.startingDate = new Date();

    this.progressContainer = container.querySelector('.progress-container');
    this.timeDisplay = container.querySelector('.time-display');
    this.startBtn = container.querySelector('.start-btn');
    this.pauseBtn = container.querySelector('.pause-btn');
    this.pauseBtn.disabled = true;
    this.resetBtn = container.querySelector('.reset-btn');
    this.resetBtn.disabled = true;

    this.setupBars();
    this.updateProgress();
    this.updateTimer();

    this.startBtn.addEventListener('click', () => this.startTimer());
    this.pauseBtn.addEventListener('click', () => this.pauseTimer());
    this.resetBtn.addEventListener('click', () => this.resetTimer());
  }

  setupBars() {
    // Create squares for each hour
    for (let i = 0; i < this.totalHours; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      this.progressContainer.appendChild(square);
    }
  }

  updateProgress() {
    const hoursPassed = Math.floor(this.timePassed / 60 / 60);
    const minutesPassed = Math.floor(this.timePassed / 60) % 60;
    const secondsPassed = Math.floor(this.timePassed) % 60;

    // Calculate the progress percentage for the current hour
    const progressPercent = (minutesPassed / 60) * 100;
    console.log(
      `Time Passed: ${hoursPassed}H ${minutesPassed}M ${secondsPassed}S`
    );

    // Fill squares up to the current hour
    const squares = this.container.querySelectorAll('.square');
    squares.forEach((square, index) => {
      // console.log('Square Index: ', index);
      if (index < hoursPassed) {
        square.classList.add('filled');
      } else if (index === hoursPassed) {
        square.style.background = `linear-gradient(to right, #4caf50 ${progressPercent}%, #dadada ${progressPercent}%)`;
      } else {
        square.classList.remove('filled');
        square.style.background = 'grey';
      }
    });
  }

  updateTimer() {
    const hours = Math.floor(this.timeLeft / 60 / 60);
    const minutes = Math.floor(this.timeLeft / 60) % 60;
    const seconds = this.timeLeft % 60;

    this.timeDisplay.textContent = `${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  // TODO FIGURE THESE METHODS OUT
  startTimer() {
    console.log('test');
    this.hasStarted = true;
    this.startBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.resetBtn.disabled = false;
    if (this.isPaused) {
      this.isPaused = false;
      this.timerInterval = setInterval(() => {
        if (!this.isPaused) {
          this.timePassed++;
          this.timeLeft = this.timeLimit - this.timePassed;

          if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
            this.timeLeft = 0;
          }

          this.updateTimer();
          this.updateProgress();
        }
      }, 1000);
    }
  }

  pauseTimer() {
    this.isPaused = !this.isPaused;

    this.isPaused
      ? (this.pauseBtn.innerHTML = 'Resume')
      : (this.pauseBtn.innerHTML = 'Pause');
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.timePassed = 0;
    this.timeLeft = this.timeLimit;
    this.updateTimer();
    this.isPaused = true;
    this.hasStarted = false;
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.resetBtn.disabled = true;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HourlyBars(document.getElementById('timer1'), 5);

  const timersContainer = document.getElementById('timers-container');
  const timerForm = document.getElementById('timer-form');

  const toggleTimerFormBtn = document.getElementById('toggle-timer-form');
  const toggleTimerForm = document.getElementById('toggle-form-content');

  timerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const durationHoursInput = document.getElementById('duration-hours');
    const duration = parseInt(durationHoursInput.value, 10);

    const titleInput = document.getElementById('timer-title');

    if (isNaN(duration) || duration <= 0) {
      alert('Please enter a valid duration.');
      return;
    }

    // Create a new timer container
    const timerContainer = document.createElement('div');
    timerContainer.className = 'timer-container';

    timerContainer.innerHTML = `
      <div class="title">${titleInput.value}</div>
      <div class="progress-container">
      </div>
      <div class="time-display">00:00:00</div>
      <div class="controls">
        <button class="start-btn">Start</button>
        <button class="pause-btn">Pause</button>
        <button class="reset-btn">Reset</button>
      </div>
    `;

    timersContainer.appendChild(timerContainer);

    // Initialize the new timer
    new HourlyBars(timerContainer, duration);

    // Clear the form
    timerForm.reset();
  });

  toggleTimerFormBtn.addEventListener('click', (event) => {
    const isVisible =
      toggleTimerForm.getAttribute('visible').toLowerCase() === 'true';
    console.log(isVisible);
    toggleTimerForm.setAttribute('visible', !isVisible);
  });
});
