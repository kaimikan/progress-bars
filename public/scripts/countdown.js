class CountdownTimer {
  constructor(container, duration) {
    this.container = container;
    this.timeLimit = duration; // total countdown time in seconds
    this.timePassed = 0;
    this.timeLeft = this.timeLimit;
    this.timerInterval = null;
    this.isPaused = true;
    this.hasStarted = false;

    this.timeDisplay = container.querySelector('.time-display');
    this.progressCircle = container.querySelector('.progress-ring__circle');
    this.startBtn = container.querySelector('.start-btn');
    this.pauseBtn = container.querySelector('.pause-btn');
    this.pauseBtn.disabled = true;
    this.resetBtn = container.querySelector('.reset-btn');
    this.resetBtn.disabled = true;

    this.FULL_DASH_ARRAY = 339.292; // 2 * PI * r, where r is the radius of the circle (54)
    this.progressCircle.style.strokeDasharray = this.FULL_DASH_ARRAY;
    this.progressCircle.style.strokeDashoffset = this.FULL_DASH_ARRAY;

    this.updateDisplay();

    this.startBtn.addEventListener('click', () => this.startTimer());
    this.pauseBtn.addEventListener('click', () => this.pauseTimer());
    this.resetBtn.addEventListener('click', () => this.resetTimer());
  }

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

          this.updateDisplay();
          this.setCircleProgress();
        }
      }, 1000);
    }
  }

  updateDisplay() {
    const hours = Math.floor(this.timeLeft / 60 / 60);
    const minutes = Math.floor(this.timeLeft / 60) % 60;
    const seconds = this.timeLeft % 60;

    this.timeDisplay.textContent = `${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  setCircleProgress() {
    const offset =
      this.FULL_DASH_ARRAY -
      (this.timePassed / this.timeLimit) * this.FULL_DASH_ARRAY;
    this.progressCircle.style.strokeDashoffset = offset;
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
    this.updateDisplay();
    this.setCircleProgress();
    this.isPaused = true;
    this.hasStarted = false;
    this.startBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.resetBtn.disabled = true;

    this.progressCircle.style.strokeDashoffset = this.FULL_DASH_ARRAY;
  }
}

// Initialize multiple timers
document.addEventListener('DOMContentLoaded', () => {
  // const timers = [
  //   new CountdownTimer(document.getElementById('timer1'), 30),
  //   new CountdownTimer(document.getElementById('timer2'), 45),
  //   new CountdownTimer(document.getElementById('timer3'), 60),
  // ];
  new CountdownTimer(document.getElementById('timer1'), 30);

  const timersContainer = document.getElementById('timers-container');
  const timerForm = document.getElementById('timer-form');

  const toggleTimerFormBtn = document.getElementById('toggle-timer-form');
  const toggleTimerForm = document.getElementById('toggle-form-content');

  timerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const durationHoursInput = document.getElementById('duration-hours');
    const durationMinutesInput = document.getElementById('duration-minutes');
    const durationSecondsInput = document.getElementById('duration-seconds');
    const duration =
      parseInt(durationHoursInput.value, 10) * 60 * 60 +
      parseInt(durationMinutesInput.value, 10) * 60 +
      parseInt(durationSecondsInput.value);

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
        <svg class="progress-ring" width="120" height="120">
            <circle class="progress-ring__circle" stroke="blue" stroke-width="4" fill="transparent" r="54" cx="60" cy="60"/>
        </svg>
        <div class="time-display">00:00</div>
        <div class="controls">
            <button class="start-btn">Start</button>
            <button class="pause-btn">Pause</button>
            <button class="reset-btn">Reset</button>
        </div>
    `;

    timersContainer.appendChild(timerContainer);

    // Initialize the new timer
    new CountdownTimer(timerContainer, duration);

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
