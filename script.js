const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Populate Countdown / Complete UI
function updateDom(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second );
    
        // Populate Countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;

        // Hide Input container
        inputContainer.hidden = true;
        // Show CountDown
        countdownEl.hidden = false;
    }, second);
}

// Take values from form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value;

    // Check for valid date
    if (countdownDate === ''){
        alert('Please select a date for the countdown.')
    }else{
        // get number version of selected date, updateDom
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }

}

// Reset All values
function reset(){
    // Hide countdowns, show Input
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle = '';
    countdownDate = '';
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);