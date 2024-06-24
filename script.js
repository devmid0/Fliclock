let countdown;
let hoursInput = document.getElementById('input-hours');
let minutesInput = document.getElementById('input-minutes');
let secondsInput = document.getElementById('input-seconds');

function confirmCountdown() {
    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('Please enter a valid countdown time.');
        return;
    }

    startCountdown(hours, minutes, seconds);
}

function startCountdown(hours, minutes, seconds) {
    let totalTime = hours * 3600 + minutes * 60 + seconds;

    countdown = setInterval(function() {
        if (totalTime <= 0) {
            clearInterval(countdown);
            playCountdownEndSound(); // تشغيل الصوت عند الانتهاء
            alert('Countdown finished!');
            stopCountdownEndSound();
            resetClock();
            return;
        }

        let remainingHours = Math.floor(totalTime / 3600);
        let remainingMinutes = Math.floor((totalTime % 3600) / 60);
        let remainingSeconds = totalTime % 60;

        updateClock(remainingHours, remainingMinutes, remainingSeconds);

        totalTime--;
    }, 1000);
}

function updateClock(hours, minutes, seconds) {
    flipClock(document.getElementById('hours'), hours);
    flipClock(document.getElementById('minutes'), minutes);
    flipClock(document.getElementById('seconds'), seconds);
}

function flipClock(element, newValue) {
    let currentValue = parseInt(element.querySelector('.flip-text').innerText);
    if (newValue !== currentValue) {
        let flipInner = element.querySelector('.flip-inner');
        flipInner.style.transform = 'rotateX(180deg)';
        setTimeout(function() {
            element.querySelector('.flip-text').innerText = newValue < 10 ? `0${newValue}` : newValue;
            flipInner.style.transform = 'rotateX(0deg)';
        }, 250);
        element.querySelector('.flip-line').style.transform = 'scaleX(0)';
        setTimeout(function() {
            element.querySelector('.flip-line').style.transform = 'scaleX(1)';
        }, 50);
    }
}

function playCountdownEndSound() {
    let audio = document.getElementById('countdown-end-sound');
    audio.play();
}

function stopCountdownEndSound() {
    let audio = document.getElementById('countdown-end-sound');
    audio.pause();
    audio.currentTime = 0;
}

function resetClock() {
    clearInterval(countdown);
    document.getElementById('hours').querySelector('.flip-text').innerText = '00';
    document.getElementById('minutes').querySelector('.flip-text').innerText = '00';
    document.getElementById('seconds').querySelector('.flip-text').innerText = '00';
    hoursInput.value = '';
    minutesInput.value = '';
    secondsInput.value = '';
}
