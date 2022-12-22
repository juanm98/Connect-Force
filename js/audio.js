let laserSound = new Audio('../assets/Blaster.mp3')
let victorySound = new Audio('../assets/Victory.mp3')
let resetSound = new Audio('../assets/Reset.wav')

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

export {
    playLaser,
    playVictory,
    playReset
}