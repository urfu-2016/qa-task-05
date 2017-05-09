var n = 4;
function getEmptyCellId(cellId, cells) {
    cellId = parseInt(cellId);
    if (cellId - 1 >= 0 && cellId % n !== 0) {
        if (parseInt(cells[cellId - 1].value) === -1){
            return cellId - 1;
        }
    }
    if (cellId + 1 < 16 && cellId % n !== n-1) {
        if (parseInt(cells[cellId + 1].value) === -1){
            return cellId + 1;
        }
    }
    if (cellId - n >= 0) {
        if (parseInt(cells[cellId - n].value) === -1){
            return cellId - n;
        }
    }
    if (cellId + n < 16) {

        if (parseInt(cells[cellId + n].value) === -1) {
            return cellId + n;
        }
    }
    return -1
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

function swap(event) {
    var e = event || window.event;

    var targetCell = e.target || e.srcElement;
        if (targetCell.tagName !== 'INPUT') {
        return;
    }
    var playGround = document.getElementById('playground');
    var cells = playGround.getElementsByClassName('button');
    var winMessage = document.getElementById('win');
    var nextCellId = getEmptyCellId(targetCell.id, cells);
    if (nextCellId !== -1) {
        swapCells(cells[nextCellId], targetCell);
    }
    if (isWin(cells)) {
        winMessage.style.visibility = 'visible';
    } else {
        winMessage.style.visibility = 'hidden';
    }
}

function compareRandom() {
    return Math.random() - 0.5;
}

function startGame(board) {
    var playGround = document.getElementById('playground');
    var winMessage = document.getElementById('win');
    winMessage.style.visibility = 'hidden';

    var buttons = [];
    for (var i = 0; i < n; i++){
        buttons[i] = [];
        for (var j = 0; j < n; j++)
        {
            buttons[i][j] = null;
        }
    }

    if (board === undefined){
        board = [];
        var number = [];
        for (i = 1; i< n*n; i++){
            number.push(i)
        }
        number.sort(compareRandom);
        number.unshift(-1);
        var count = 0;
        for (i = 0; i < n; i++) {
            board[i] = [];
            for(j = 0; j < n; j++)
            {
                board[i][j] = number[count];
                count++
            }
        }
    }

    for (i = 0; i < n; i++) {
        for (j = 0; j <n; j++){
            var button = document.createElement('input');
            button.id = i * n +j;
            button.type = 'button';
            button.className = 'button';
            button.value = board[i][j];
            if (board[i][j] === -1){
                button.style.visibility = 'hidden';
            }
            else {
                button.style.visibility = 'visible';
            }
            buttons[i][j] = button;
            playGround.appendChild(button);
            if ((i*4 + j + 1) % n === 0) {
                playGround.appendChild(document.createElement('br'));
            }
        }
    }

    if (playGround.addEventListener) {
        playGround.addEventListener('click', swap);
    } else {
        playGround.attachEvent('onclick', swap);
    }
}

document.body.onload = startGame();