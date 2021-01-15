const video = document.querySelector('video');
const timeView = document.querySelector("#toolbar > div.current-time")
const playpausebtn = document.querySelector("#toolbar > button:nth-child(1)")
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const quizOverlay = document.querySelector("#quiz-overlay")
const continueBtn = document.querySelector("#quiz-overlay > div > button")
const volumeBar = document.querySelector("#toolbar > input")

const updateTimeString = () => {
    const currentTimeFormat = `${Math.floor(video.currentTime)}`.toHHMMSS()
    const videoDuration = `${Math.floor(video.duration)}`.toHHMMSS()
    const newString = `${currentTimeFormat} / ${videoDuration}`

    if (timeView.innerHTML != newString) {
        timeView.innerHTML = newString
        maxTime = maxTime < video.currentTime ? video.currentTime : maxTime
        console.log(`maxtime`, maxTime)
    }
}

const handlePlayPause = () => {
    isPlay = !isPlay

    console.log(video.currentTime, video.duration)

    if (isPlay) {
        playpausebtn.innerHTML = 'pause'
        video.play()
        loopUpdateTimeString = setInterval(updateTimeString, 200)
    }
    else {
        playpausebtn.innerHTML = 'play'
        video.pause()
        clearInterval(loopUpdateTimeString)
    }
}

const handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;

    // 여기가 퀴즈 보내는 ...
    if (quizStep === 0 && Math.floor(video.currentTime) == quiz1Time) {
        quizStep = 1
        quizOverlay.style.display = 'block'
        handlePlayPause()
    }
}

const scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    quizStep = 0

    if (maxTime < scrubTime) {
        console.log('이동불가. ')
    } else {
        video.currentTime = scrubTime;
    }
}

// btn interaction
video.addEventListener('timeupdate', handleProgress);
playpausebtn.addEventListener('click', handlePlayPause)
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => {
    mousedown && scrub(e);
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
continueBtn.addEventListener('click', () => {
    quizOverlay.style.display = 'none'
    handlePlayPause();
});

// init
let quizStep = 0
let mousedown = false;
const quiz1Time = 2
let maxTime = 0;
let isPlay = true
handlePlayPause()
let loopUpdateTimeString = setInterval(updateTimeString, 200)
