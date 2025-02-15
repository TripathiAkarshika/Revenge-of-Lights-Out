const boardSize = 5; // 5x5 board
let board = [];
let moves = 0;
let timer = 0;
let timerInterval;
// Create the game board
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    const moveCounter = document.getElementById('move-counter');
    const timerElement = document.getElementById('timer');
    // Clear the existing board and reset counters
    gameBoard.innerHTML = '';
    clearInterval(timerInterval); // Stop any running timer
    moves = 0;
    timer = 0;
    moveCounter.textContent = moves;
    timerElement.textContent = formatTime(timer);
    // Start the timer
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = formatTime(timer);
    }, 1000);
    // Create the game board
    board = []; // Reset board array
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.row = i;
            square.dataset.col = j;
            square.addEventListener('click', () => toggleLights(i, j));
            gameBoard.appendChild(square);
            board[i][j] = square;
        }
    }
    randomizeBoard();
}
// Toggle a square and its neighbors
function toggleLights(row, col, silent = false) {
    const toggle = (r, c) => {
        if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
            board[r][c].classList.toggle('is-off');
        }
    };
    toggle(row, col); // Toggle clicked square
    toggle(row - 1, col); // Above
    toggle(row + 1, col); // Below
    toggle(row, col - 1); // Left
    toggle(row, col + 1); // Right
    if (!silent) { // Increment move counter only if not silent
        moves++;
        document.getElementById('move-counter').textContent = moves;
    }
    checkWin();
}
// Randomize the board with a solvable configuration
function randomizeBoard() {
    for (let i = 0; i < 10; i++) { // Simulate 10 random clicks
        const row = Math.floor(Math.random() * boardSize);
        const col = Math.floor(Math.random() * boardSize);
        toggleLights(row, col, true); // Pass silent = true to avoid incrementing m
        oves
    }
}
// Check if all lights are off
function checkWin() {
    const allOff = board.flat().every(square => square.classList.contains('is-off')
    );
    if (allOff) {
        clearInterval(timerInterval); // Stop the timer
        window.alert(`You win! Time: ${formatTime(timer)}, Moves: ${moves}`);
    }
}
// Format the timer in 00:00 format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart
        (2, '0')}`;
}
// Add event listener for the "New Game" button
document.getElementById('new-game-button').addEventListener('click', createBoard);
// Initialize the game
document.addEventListener('DOMContentLoaded', createBoard);