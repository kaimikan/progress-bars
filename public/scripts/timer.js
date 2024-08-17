const totalHours = 5; // Total number of hours for the progress bar
const progressContainer = document.querySelector('.progress-container');
const startingDate = new Date();

// Create squares for each hour
for (let i = 0; i < totalHours; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  progressContainer.appendChild(square);
}

function updateProgress() {
  // Get the current date and time
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMilliseconds = now - startingDate;

  const hoursPassed = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutesPassed = Math.floor(diffInMilliseconds / (1000 * 60)) % 60;
  const secondsPassed = Math.floor(diffInMilliseconds / 1000) % 60;

  console.log('Hour: ', hoursPassed);
  console.log('Minutes: ', minutesPassed);
  console.log('Seconds: ', secondsPassed);

  // Calculate the progress percentage for the current hour
  const progressPercent = (secondsPassed / 60) * 100;

  // Fill squares up to the current hour
  const squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    // console.log('Square Index: ', index);
    if (index < minutesPassed) {
      square.classList.add('filled');
    } else if (index === minutesPassed) {
      square.style.background = `linear-gradient(to right, #4caf50 ${progressPercent}%, #dadada ${progressPercent}%)`;
    } else {
      square.classList.remove('filled');
      square.style.background = 'grey';
    }
  });
}

// Initial update and set interval to update every minute
updateProgress();
setInterval(updateProgress, 1000);
