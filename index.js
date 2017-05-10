var gameBoard = createBoard();
var gameBoardElement = document.getElementById('game-board');
printBoard();
gameBoardElement.addEventListener('click', function (event) {
    move(event.target.id);
    if (checkWin()) {
        document.querySelector('.game-victory').style.display = 'block';
    }
});


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
    for (var i = 0; i < 4; i++) {
        gameBoardElement.appendChild(document.createElement('tr'));
        for (var j = 0; j < 4; j++) {
            var gameBoardLine = document.querySelector('#game-board tr:last-of-type');
            var gameElement = document.createElement('td');
            gameElement.id = (i * 4 + j).toString();
            gameElement.innerHTML = gameBoard[i * 4 + j] === 0 ? '' : gameBoard[i * 4 + j];
            gameElement.className = gameBoard[i * 4 + j] === 0 ? 'game-cell empty' : 'game-cell';
            gameBoardLine.appendChild(gameElement);
        }
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
