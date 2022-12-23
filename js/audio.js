let laserSound = new Audio('../audio-assets/Blaster.mp3')
let victorySound = new Audio('../audio-assets/Victory.mp3')
let resetSound = new Audio('../audio-assets/Reset.wav')
let soundtrackSound = new Audio('../audio-assets/Duel.mp3')

function playLaser() {
    laserSound.volume = 0.25
    laserSound.play()
}

function playVictory() {
    victorySound.volume = 0.25
    victorySound.play()
}

function playReset() {
    resetSound.volume = 0.25
    resetSound.play()
}

function playSoundTrack() {
    soundtrackSound.volume = 0.25
    soundtrackSound.play()
}

function pauseSoundTrack() {
    soundtrackSound.pause()
}

export {
    playLaser,
    playVictory,
    playReset,
    playSoundTrack,
    pauseSoundTrack
}