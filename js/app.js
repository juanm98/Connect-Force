/*-------------------------------- Constants --------------------------------*/
import * as starWarAudio from './audio.js'


let winningCombos = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34]
]


/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie

/*------------------------ Cached Element References ------------------------*/
const circlesEl = document.querySelectorAll(".circle")
const boardEl = document.querySelector('.board')
const resultEl = document.getElementById('result')
const messageEl = document.getElementById('current-player')
const resetEl = document.getElementById('btn')
/*----------------------------- Event Listeners -----------------------------*/
circlesEl.forEach(function(circle) {
    circle.addEventListener('click', handleClick)
})
resetEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
    board = 
    [null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null,
    null, null, null, null, null, null, null]
    turn = 1
    winner = false
    tie = false
    render()
}

function render () {
    updateBoard()
    updateMessage()
}

function updateBoard () {
    board.forEach(function(circle, Idx) {
        if (circle === 1) {
            circlesEl[Idx].innerHTML = '<img id="icon" src="picture-assets/vader-token.png">'
        } else if (circle === -1) {
            circlesEl[Idx].innerHTML = '<img id="icon" src="picture-assets/yoda-token.png">'
        } else if (circle === null) {
            circlesEl[Idx].innerHTML = " "
        }
    })
}

function updateMessage () {
    if (!winner && !tie) {
        messageEl.innerHTML = `it's ${turn === 1 ? '<img id="icon" src="picture-assets/vader-token.png">' : '<img id="icon" src="picture-assets/yoda-token.png">'}'s turn` 
    } else if (!winner && tie) {
        messageEl.innerHTML = `it's a Tie!`;
    } else {
        messageEl.innerHTML = `${turn === 1 ? '<img id="icon" src="picture-assets/vader-token.png">' : '<img id="icon" src="picture-assets/yoda-token.png">'} wins`;
    }
}

function handleClick (evt) {
    starWarAudio.playLaser()
    const sqIdx = parseInt(evt.target.id.replace('circle', ''))
    if (board[sqIdx] !== null) return
    if (winner === true) return
    
    let bottonRow = 35
    while (board[sqIdx + bottonRow] !== null) {
        bottonRow -= 7 
    }
    board[sqIdx + bottonRow] = turn
    
    checkForTie()
    checkForWinner()
    switchPlayerTurn()
    render()
}

function checkForTie () {
    if (!board.includes(null)) {
        tie = true
    }
}

function checkForWinner () {
    if (
    
    Math.abs(board[14] + board[21] + board[28] + board[35]) === 4 ||
    Math.abs(board[0] + board[1] + board[2] + board[3]) === 4 ||
    Math.abs(board[41] + board[40] + board[39] + board[38]) === 4 ||
    Math.abs(board[7] + board[8] + board[9] + board[10]) === 4 ||
    Math.abs(board[34] + board[33] + board[32] + board[31]) === 4 ||
    Math.abs(board[14] + board[15] + board[16] + board[17]) === 4 ||
    Math.abs(board[27] + board[26] + board[25] + board[24]) === 4 ||
    Math.abs(board[21] + board[22] + board[23] + board[24]) === 4 ||
    Math.abs(board[20] + board[19] + board[18] + board[17]) === 4 ||
    Math.abs(board[28] + board[29] + board[30] + board[31]) === 4 ||
    Math.abs(board[13] + board[12] + board[11] + board[10]) === 4 ||
    Math.abs(board[13] + board[12] + board[11] + board[10]) === 4 ||
    Math.abs(board[35] + board[36] + board[37] + board[38]) === 4 ||
    Math.abs(board[13] + board[12] + board[11] + board[10]) === 4 ||
    Math.abs(board[35] + board[36] + board[37] + board[38]) === 4 ||
    Math.abs(board[6] + board[5] + board[4] + board[3]) === 4 ||
    Math.abs(board[0] + board[7] + board[14] + board[21]) === 4 ||
    Math.abs(board[41] + board[34] + board[27] + board[20]) === 4 ||
    Math.abs(board[40] + board[33] + board[26] + board[19]) === 4 ||
    Math.abs(board[2] + board[9] + board[16] + board[23]) === 4 ||
    Math.abs(board[39] + board[32] + board[25] + board[18]) === 4 ||
    Math.abs(board[3] + board[10] + board[17] + board[24]) === 4 ||
    Math.abs(board[38] + board[31] + board[24] + board[17]) === 4 ||
    Math.abs(board[4] + board[11] + board[18] + board[25]) === 4 ||
    Math.abs(board[37] + board[30] + board[23] + board[16]) === 4 ||
    Math.abs(board[36] + board[29] + board[22] + board[15]) === 4 ||
    Math.abs(board[6] + board[13] + board[20] + board[27]) === 4 ||
    Math.abs(board[35] + board[28] + board[16] + board[24]) === 4 ||
    Math.abs(board[41] + board[33] + board[25] + board[17]) === 4 ||
    Math.abs(board[7] + board[15] + board[23] + board[31]) === 4 ||
    Math.abs(board[34] + board[26] + board[18] + board[10]) === 4 ||
    Math.abs(board[14] + board[22] + board[30] + board[38]) === 4 ||
    Math.abs(board[27] + board[19] + board[11] + board[3]) === 4 ||
    Math.abs(board[35] + board[29] + board[23] + board[17]) === 4 ||
    Math.abs(board[28] + board[22] + board[16] + board[10]) === 4 ||
    Math.abs(board[13] + board[19] + board[25] + board[31]) === 4 ||
    Math.abs(board[21] + board[15] + board[9] + board[3]) === 4 ||
    Math.abs(board[20] + board[26] + board[32] + board[38]) === 4 ||
    Math.abs(board[36] + board[30] + board[24] + board[18]) === 4 ||
    Math.abs(board[37] + board[31] + board[25] + board[19]) === 4 ||
    Math.abs(board[39] + board[31] + board[23] + board[15]) === 4 ||
    Math.abs(board[40] + board[32] + board[24] + board[16]) === 4 ||
    Math.abs(board[9] + board[17] + board[25] + board[33]) === 4 ||
    Math.abs(board[8] + board[16] + board[24] + board[32]) === 4 ||
    Math.abs(board[11] + board[17] + board[23] + board[29]) === 4 ||
    Math.abs(board[12] + board[18] + board[24] + board[30]) === 4 ||
    Math.abs(board[1] + board[2] + board[3] + board[4]) === 4 ||
    Math.abs(board[5] + board[4] + board[3] + board[2]) === 4 ||
    Math.abs(board[8] + board[9] + board[10] + board[11]) === 4 ||
    Math.abs(board[12] + board[11] + board[10] + board[9]) === 4 ||
    Math.abs(board[15] + board[16] + board[17] + board[18]) === 4 ||
    Math.abs(board[19] + board[18] + board[17] + board[16]) === 4 ||
    Math.abs(board[22] + board[23] + board[24] + board[25]) === 4 ||
    Math.abs(board[26] + board[25] + board[24] + board[23]) === 4 ||
    Math.abs(board[29] + board[30] + board[31] + board[32]) === 4 ||
    Math.abs(board[33] + board[32] + board[31] + board[30]) === 4 ||
    Math.abs(board[36] + board[37] + board[38] + board[39]) === 4 ||
    Math.abs(board[40] + board[39] + board[38] + board[37]) === 4 ||
    Math.abs(board[7] + board[14] + board[21] + board[28]) === 4 ||
    Math.abs(board[8] + board[15] + board[22] + board[29]) === 4 ||
    Math.abs(board[9] + board[16] + board[23] + board[30]) === 4 ||
    Math.abs(board[10] + board[17] + board[24] + board[31]) === 4 ||
    Math.abs(board[11] + board[18] + board[25] + board[32]) === 4 ||
    Math.abs(board[12] + board[19] + board[26] + board[33]) === 4 ||
    Math.abs(board[13] + board[20] + board[27] + board[34]) === 4 
    
    ) {
        winner = true
    }
}    

function switchPlayerTurn () {
    if(!winner) turn *= -1
}