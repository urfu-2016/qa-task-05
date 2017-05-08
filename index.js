var neighbours = {};

function getNextCellId(cellId, cells) {
    var nextCell = neighbours[cellId].filter(function(item) {
        return parseInt(cells[item].value) === -1;
    });
    return nextCell.length !== 0 ? nextCell[0] : -1;
}

function isWin(cells) {
    for (var i = 0; i < cells.length - 1; i++) {
        if (parseInt(cells[i].value) !== i + 1) {
            return false;
        }
    }
    return true;
}

function swapCells(nextCell, targetCell) {
    nextCell.style.visibility = 'visible'; 
    nextCell.value = targetCell.value;
    targetCell.style.visibility = 'hidden'; 
    targetCell.value = -1;
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
    var nextCellId = getNextCellId(targetCell.id, cells);
    if (nextCellId !== -1) {
        swapCells(cells[nextCellId], targetCell);
    }
    if (isWin(cells)) {
        winMessage.style.visibility = 'visible';
    } else {
        winMessage.style.visibility = 'hidden';
    }
}

function getButton(id) {
    var button = document.createElement('input');
    button.id = id;
    button.type = 'button';
    button.className = 'button';
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

function getNeighbourCells(cellNumber) {
    var neighbourCells = [];
    if (cellNumber - 1 >= 0 && cellNumber % 4 !== 0) {
        neighbourCells.push(parseInt(cellNumber - 1));
    }
    if (cellNumber + 1 < 16 && (cellNumber + 1) % 4 !== 0) {
        neighbourCells.push(parseInt(cellNumber + 1));
    }
    if (cellNumber - 4 >= 0) {
        neighbourCells.push(parseInt(cellNumber - 4));
    }
    if (cellNumber + 4 < 16) {
        neighbourCells.push(parseInt(cellNumber + 4));
    }
    return neighbourCells;
}

function setupGame() {
    var playGround = document.getElementById('playground');
    var winMessage = document.getElementById('win-message');
    winMessage.style.visibility = 'hidden';
    var buttons = [];
    for (var i = 0; i < 16; i++) {
        var button = getButton(i);
        playGround.appendChild(button);
        buttons.push(button);
        if ((i + 1) % 4 === 0) {
            playGround.appendChild(document.createElement('br'));
        }
    }
    buttons[0].style.visibility = 'hidden';
    buttons[0].value = -1;
    if (playGround.addEventListener) {
        playGround.addEventListener('click', makeMove);
    } else {
        playGround.attachEvent('onclick', makeMove); // IE8
    }
    var buttonsPositions = getSolvableCombination();
    for (var j = 0; j < 16; j++) {
        if (j > 0) {
            buttons[j].value = buttonsPositions[j - 1];
        }
        neighbours[j] = getNeighbourCells(j);
    }
}

document.body.onload = setupGame();