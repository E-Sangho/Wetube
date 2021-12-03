const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const fullscreen = document.getElementById("fullscreen");

let globalVolume = 0.5;

const handlePlayClick = () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Pause" : "Play";
};

const handleMuteClick = () => {
    video.muted = video.muted ? false : true;
    muteBtn.innerText = video.muted ? "Mute" : "Unmute"; 
    volumeRange.value = video.muted ? globalVolume : 0;
};

const handleVolumeChange = (event) => {
    const {
        target: { value },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    globalVolume = value;
    video.volume = value;
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);