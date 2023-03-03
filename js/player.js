const btnFullScr = document.querySelector('.video-button-fullscreen');
const btnPlay = document.querySelector('.video-play-btn');
const btnPlayBig = document.querySelector('#video-play-bigbtn');
const btnVolume = document.querySelector('.video-button-volume');
const rangeVideo = document.querySelector('.video-range-progress');
const rangeVolume = document.querySelector('.video-range-volume');
const playerFrame = document.querySelector('.video-frame');
const video = document.querySelector('.video-content');

video.addEventListener('click', togglePlay);
video.addEventListener('pause', updateButton);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', videoProgress);
rangeVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 0%, #b3b3b3 0%, #b3b3b3 100%)`

btnFullScr.addEventListener('click', toggleFullScreen);
btnPlay.addEventListener('click', togglePlay);
btnPlayBig.addEventListener('click', togglePlay);
btnVolume.addEventListener('click', toggleVolume);

let isMouseDown = false;
rangeVideo.addEventListener('click', setCurrentTime);
rangeVideo.addEventListener('mousedown', () => isMouseDown = true);
rangeVideo.addEventListener('mousemove', (e) => isMouseDown && setCurrentTime(e));
rangeVideo.addEventListener('mouseup', () => isMouseDown = false);
rangeVolume.addEventListener('click', volumeUpdate);
rangeVolume.addEventListener('mousedown', () => isMouseDown = true);
rangeVolume.addEventListener('mousemove', (e) => isMouseDown && volumeUpdate(e));
rangeVolume.addEventListener('mouseup', () => isMouseDown = false);

function togglePlay() {
    if (video.paused)
        video.play();
    else
        video.pause();
}

function updateButton() {
    if (!this.paused) {
        btnPlayBig.hidden = true;
        btnPlay.style.backgroundImage = 'url(./assets/svg/button-pause.svg)';
    } else {
        btnPlayBig.hidden = false;
        btnPlay.style.backgroundImage = 'url(./assets/svg/button_play.svg)';
    }
}

let prevVolume = 0;

function toggleVolume() {
    const isMuted = video.volume === 0;
    if (isMuted)
        video.volume = prevVolume
    else {
        prevVolume = video.volume;
        video.volume = 0;
    }
    setVolumeImage(isMuted)
}

function setVolumeImage(isMuted) {
    if (isMuted) {
        btnVolume.style.backgroundImage = 'url(./assets/svg/button_volume.svg)';
        setVolumeRange(video.volume);
    } else {
        btnVolume.style.backgroundImage = 'url(./assets/svg/button-mute.svg)';
        setVolumeRange(0);
    }
}

function setVolumeRange(volume) {
    volume = Math.floor(volume * 100);
    rangeVolume.value = volume
    rangeVolume.style.background = `linear-gradient(to right, #710707 ${volume}%, #C4C4C4 ${volume}%, #C4C4C4 100%)`
}

function volumeUpdate(e) {
    let volume = e.offsetX / rangeVolume.offsetWidth;
    volume = Math.floor(volume * 100) / 100;
    if (volume < 0.95)
        volume += 0.05;
    else if (volume >= 0.95)
        volume = 1;
    else if (volume > 0.05)
        volume -= 0.05;
    if (volume <= 0.05)
        volume = 0;
    video.volume = volume;

    if (Number(volume) === 0)
        setVolumeImage(false);
    else
        setVolumeImage(true);
}

function videoProgress() {
    const progress = ((Math.floor(video.currentTime) / Math.floor(video.duration)) * 100) || 0;
    rangeVideo.value = progress;
    rangeVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress}%, #b3b3b3 ${progress}%, #b3b3b3 100%)`
}

function setCurrentTime(e) {
    video.currentTime = (e.offsetX / rangeVideo.offsetWidth) * video.duration;
}

function getFullscreenElement() {
    return document.fullscreenElementn ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement;
}

function toggleFullScreen() {
    if (getFullscreenElement()) {
        btnFullScr.style.backgroundImage = 'url(./assets/svg/button_fullscreen.svg)';
        document.exitFullscreen();
    } else {
        btnFullScr.style.backgroundImage = 'url(./assets/svg/button-exitfullscreen.svg)';
        playerFrame.requestFullscreen();
    }
}

