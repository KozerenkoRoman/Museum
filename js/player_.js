const videoRangeProgress = document.getElementById('video-range-progress');
videoRangeProgress.addEventListener('input', function () {
    const value = this.value;
    const newTime = player.getDuration() * value / 100;
    player.seekTo(newTime);
    this.style.background = `linear-gradient(to right, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

const volumeProgress = document.getElementById('video-range-volume');
volumeProgress.addEventListener('input', function () {
    const value = this.value;
    player.setVolume(value);
    if (Number(value) === 0) {
        player.mute()
        setVolumeImage(false);
    } else {
        player.unMute();
        setVolumeImage(true);
    }
    this.style.background = `linear-gradient(to right, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

var player;
var iframe;

let ytPlayerManager = (function YTPlayerManager() {
    let players = [];

    function register(id, videoId) {
        players.push({
            id: id,
            player: makePlayer(id, videoId)
        });
    }

    function makePlayer(id, videoId) {
        return new YT.Player(id, {
            videoId: videoId,
            height: '254',
            width: '452',
            enablejsapi: 1,
            events: {
                'onStateChange': function (event) {
                    if (event.data === YT.PlayerState.PLAYING) {
                        videoPlaying(id);
                    }
                }
            }
        });
    }

    function videoPlaying(id) {
        players.forEach(function (item) {
            if (item.id !== id) {
                item.player.pauseVideo();
            }
        });
    }

    return {register};
})();


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '650',
        width: '1440',
        videoId: 'zp1BXPX8jcU',
        playerVars: {
            playsinline: 1,
            autoplay: 0,
            controls: 0,
            showinfo: 0,
            rel: 0,
            enablejsapi: 1,
            fs : 0,
            autohide: 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError,
        }
    });
    // ytPlayerManager.register('video1', 'zp1BXPX8jcU');
    // ytPlayerManager.register('video2', 'Vi5D6FKhRmo');
    // ytPlayerManager.register('video3', 'NOhDysLnTvY');
    // ytPlayerManager.register('video4', 'aWmJ5DgyWPI');
    // ytPlayerManager.register('video5', 'aWmJ5DgyWPI');
    player.hidden = true;
}

function onPlayerReady() {
    // var player = event.target;
    setupListener();
    updateProgressBar();
    iframe = document.getElementById('video-frame');
    timeUpdateInterval = setInterval(function () {
        updateProgressBar();
    }, 100);
}

function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.ENDED:
            break;
        case YT.PlayerState.PLAYING:
            document.getElementById('video-play-bigbtn').hidden = true;
            document.getElementById('video-play-btn').style.backgroundImage = 'url(./assets/svg/button-pause.svg)';
            break;
        case YT.PlayerState.PAUSED:
            document.getElementById('video-play-bigbtn').hidden = false;
            document.getElementById('video-play-btn').style.backgroundImage = 'url(./assets/svg/button_play.svg)';
            break;
        case YT.PlayerState.BUFFERING:
            break;
        case YT.PlayerState.CUED:
            break;
    }
}

function onPlayerError(event) {
    switch (event.data) {
        case 2:
            console.log('The request contains an invalid parameter value');
            break;
        case 5:
            console.log('The requested content cannot be played in an HTML5 player');
            break;
        case 100:
            console.log('The video requested was not found');
            break;
        case 101:
            console.log('The owner of the requested video does not allow it to be played in embedded players');
            break;
        case 150:
            console.log('This error is the same as 101. It\'s just a 101 error in disguise!');
            break;
    }
}

function togglePlay() {
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING)
        player.pauseVideo()
    else
        player.playVideo();
}

function toggleVolume() {
    const isMuted = player.isMuted();
    if (isMuted)
        player.unMute()
    else
        player.mute();
    setVolumeImage(isMuted)
}

function toggleFullscreen() {
    if (getFullscreenElement()) {
        document.getElementById('video-full-btn').style.backgroundImage = 'url(./assets/svg/button_fullscreen.svg)';
        document.exitFullscreen();
        iframe.style = '';
        document.getElementById('player').style = '';
    } else {
        document.getElementById('video-full-btn').style.backgroundImage = 'url(./assets/svg/button-exitfullscreen.svg)';
        iframe.requestFullscreen();
        iframe.style = 'display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-evenly; align-content:flex-end;';
        document.getElementById('player').style = 'width:100%;height:100%';
    }
}

function getFullscreenElement() {
    return document.fullscreenElementn ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement;
}

function setVolumeImage(isMuted) {
    if (isMuted)
        document.getElementById('video-button-volume').style.backgroundImage = 'url(./assets/svg/button_volume.svg)';
    else
        document.getElementById('video-button-volume').style.backgroundImage = 'url(./assets/svg/button-mute.svg)';
}

function setupListener() {
    document.getElementById('video-full-btn').addEventListener('click', toggleFullscreen);
    document.getElementById('video-play-bigbtn').addEventListener('click', togglePlay);
    document.getElementById('video-play-btn').addEventListener('click', togglePlay);
    document.getElementById('video-button-volume').addEventListener('click', toggleVolume);
}

function updateProgressBar() {
    const value = player.getCurrentTime() / player.getDuration() * 100;
    videoRangeProgress.style.background = `linear-gradient(to right, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
    videoRangeProgress.value = value;
}

function loadPlaylistVideoIds() {
    player.loadPlaylist({
        'playlist': ['9HPiBJBCOq8', 'Mp4D0oHEnjc', '8y1D8KGtHfQ', 'jEEF_50sBrI'],
        'listType': 'playlist',
        'index': 0,
        'startSeconds': 0,
        'suggestedQuality': 'small'
    });
}



