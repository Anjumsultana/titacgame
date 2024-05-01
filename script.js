let currentPlayer = 'A';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let gamePaused = false;
let pausedBoard = [];

function makeMove(cellIndex) {
    if (!gamePaused && board[cellIndex] === '' && !checkWinner()) {
        board[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            if (currentPlayer === 'A') {
                window.location.href = 'winnerA.html';
            } else {
                window.location.href = 'winnerS.html';
            }
        } else if (board.every(cell => cell !== '')) {
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'A' ? 'S' : 'A';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'A';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    message.textContent = `Player ${currentPlayer}'s turn`;
    gamePaused = false;
}

function pauseGame() {
    if (!gamePaused) {
        gamePaused = true;
        message.textContent = "Game Paused";
        pausedBoard = board.slice();
        for (let i = 0; i < cells.length; i++) {
            cells[i].setAttribute('onclick', '');
        }
        document.getElementById('pauseButton').textContent = 'Play';
    } else {
        gamePaused = false;
        board = pausedBoard.slice();
        for (let i = 0; i < cells.length; i++) {
            if (board[i] === '') {
                cells[i].setAttribute('onclick', `makeMove(${i})`);
            } else {
                cells[i].setAttribute('onclick', '');
            }
        }
        message.textContent = `Player ${currentPlayer}'s turn`;
        document.getElementById('pauseButton').textContent = 'Pause';
    }
}