var gameField = [];
var hasFieldUpdated = false;
var ROW_SIZE = 4;

function isWin(cells) {
    for (var i = 0; i < cells.length - 1; i++) {
         if (parseInt(cells[i].value) !== i + 1) {
             return false;
         }
     }
     return true;
}

function getPositionOnFieldById(id) {
    return {
        i: Math.floor(id/ROW_SIZE),
        j: id % ROW_SIZE
    };
}

function getIndexByPosition(i, j) {
    return i*ROW_SIZE + j;
}

function swapCells(first, second) {
    var temp = gameField[first.i][first.j];
    gameField[first.i][first.j] = gameField[second.i][second.j];
    gameField[second.i][second.j] = temp;
}

function updateGameField(cells, targetCell, winMessage) {
    var targetPosition = getPositionOnFieldById(targetCell.id);
    if (gameField[targetPosition.i][targetPosition.j] === -1) {
        return;
    }
    var neighbours = getNeigbours(targetPosition);
    hasFieldUpdated = false;
    for(var i = 0; i < neighbours.length; i++) {
        var position = neighbours[i];
        if (gameField[position.i][position.j] === -1) {
            hasFieldUpdated = true;
            swapCells(position, targetPosition);
        }
    }
}

function getNeigbours(targetPosition) {
    var neighboursPositions = [
        { i: targetPosition.i, j: targetPosition.j + 1 },
        { i: targetPosition.i, j: targetPosition.j - 1 },
        { i: targetPosition.i + 1, j: targetPosition.j },
        { i: targetPosition.i - 1, j: targetPosition.j }
    ];
    return neighboursPositions.filter(function(position) {
        return isOnField(position.i, position.j);
    });
}

function isOnField(i, j) {
    return [i, j].every(function(el) {
        return el >= 0 && el < 4;
    });
}

function makeMove(event) {
    var e = event || window.event;
    var targetCell = e.target || e.srcElement;
    if (targetCell.tagName !== 'INPUT') {
        return; 
    }
    var playGround = document.getElementById('playground');
    var cells = playGround.getElementsByClassName('button');
    var winMessage = document.getElementById('win-message');
    updateGameField(cells, targetCell, winMessage);
    if (hasFieldUpdated) {
        fillCells(cells);
        if (isWin(cells)) {
            winMessage.className = 'visible';
        } else {
            winMessage.className = 'hidden';
        }
    }
}

function getButton(id) {
    var button = document.createElement('input');
    button.id = id;
    button.type = 'button';
    return button;
}

function getRandomCombination() {
    var cells = [];
    for (var i = 1; i < 16; i++) {
        cells.push(i);
    }
    cells.sort(new Function('x', 'y', 'return Math.random () - Math.random ()'));
    return cells;
}

function getSolvableCombination() {
    var step = 1;
    while (step % 2 !== 0) {
        var inversionCount = 1;
        var cellsNumbers = getRandomCombination();
        for (var i = 0; i < cellsNumbers.length; i++) {
            for (var j = i + 1; j < cellsNumbers.length + 1; j++) {
                if (cellsNumbers[j] < cellsNumbers[i]) {
                    inversionCount++;
                }
            }
        }
        step = inversionCount;
    }
    return cellsNumbers;
}

function fillCells(buttons) {
    for (var i = 0; i < ROW_SIZE; i++) {
        for (var j = 0; j < ROW_SIZE; j++) {
            var index = getIndexByPosition(i, j);
            buttons[index].value = gameField[i][j];
            buttons[index].className = 'button';
            if (gameField[i][j] === -1) {
                buttons[index].className += ' hidden';
            }
        }
    }
}

function setGameField(positions) {
    gameField = [];
    for(var i = 0; i < ROW_SIZE; i++) {
        gameField.push([]);
        for(var j = 0; j < ROW_SIZE; j++) {
            gameField[i].push(positions[getIndexByPosition(i, j)]);
        }
    }
}

function setupGame() {
    var playGround = document.getElementById('playground');
    var winMessage = document.getElementById('win-message');
    winMessage.className = 'hidden';
    var buttons = [];
    for (var i = 0; i < 16; i++) {
        var button = getButton(i);
        playGround.appendChild(button);
        buttons.push(button);
        if ((i + 1) % 4 === 0) {
            playGround.appendChild(document.createElement('br'));
        }
    }
    if (playGround.addEventListener) {
        playGround.addEventListener('click', makeMove);
    } else {
        playGround.attachEvent('onclick', makeMove); // IE8
    }
    var positions = getSolvableCombination();
    setGameField([-1].concat(positions));
    fillCells(buttons);
}

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', setupGame);
} else {
    document.attachEvent('onDOMContentLoaded', setupGame); // IE8
}