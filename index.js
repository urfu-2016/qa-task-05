var gameBoard;
var gameBoardElement = document.getElementById('game-board');

gameBoardElement.addEventListener('click', function (event) {
    move(event.target.id);
    if (checkWin()) {
        document.querySelector('.game-victory').style.display = 'block';
    }
});

startNewGame();

function startNewGame() {
    document.querySelector('.game-victory').style.display = 'none';
    gameBoard = createBoard();
    printBoard();
}

function createBoard() {
    var gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function () {
        return Math.random() - 0.5;
    });

    gameBoard.unshift(0);

    return gameBoard;
}

function printBoard() {
    while (gameBoardElement.firstChild) {
        gameBoardElement.removeChild(gameBoardElement.firstChild);
    }
    for (var i = 0; i < 16; i++) {
        var gameCell = document.createElement('div');
        gameCell.id = i;
        gameCell.innerHTML = gameBoard[i];
        gameCell.className = gameBoard[i] === 0 ? 'game-cell empty' : 'game-cell';
        gameBoardElement.appendChild(gameCell);
    }
}

function move(id) {
    id = parseInt(id);
    if (gameBoard[id] === 0) {
        return;
    }

    if (gameBoard[id + 4] === 0) {
        gameBoard[id + 4] = gameBoard[id];
        gameBoard[id] = 0;
        printBoard();

        return;
    }

    if (gameBoard[id - 4] === 0) {
        gameBoard[id - 4] = gameBoard[id];
        gameBoard[id] = 0;
        printBoard();

        return;
    }

    if (gameBoard[id - 1] === 0 && Math.floor(id / 4) === Math.floor((id - 1) / 4)) {
        gameBoard[id - 1] = gameBoard[id];
        gameBoard[id] = 0;
        printBoard();

        return;
    }

    if (gameBoard[id + 1] === 0 && Math.floor(id / 4) === Math.floor((id + 1) / 4)) {
        gameBoard[id + 1] = gameBoard[id];
        gameBoard[id] = 0;
        printBoard();
    }
}

function checkWin() {
    return !gameBoard.some(function (item, index) {
        return item !== 0 && (item - 1) !== index;
    });
}
