// Логику пятнашек нужно описать в этом файле
var VICTORY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]; 
var CURRENT_PLAY = [];


function newGame() {
    document.getElementById('board').innerHTML = '';
    document.getElementById('victory').innerHTML = '';
    CURRENT_PLAY = shuffle(VICTORY.slice());
    draw();
}

function shuffle(arr) {
    return arr.sort(function() { 
        return Math.random() - 0.5; 
    })
}

function draw() {
    var drawCell = document.getElementById('board');
    CURRENT_PLAY.forEach(function (elem, index) {
        var cell = document.createElement('div');
        cell.innerHTML = elem + '';
        cell.className = elem ? 'cell' : 'cell empty';
        if (elem) {
            cell.onclick = movement.bind(this, index);
            checkVictory();
        }
        drawCell.appendChild(cell);
    });
}

function checkVictory() {
    if (JSON.stringify(VICTORY) === JSON.stringify(CURRENT_PLAY)) {
        document.getElementById('victory').innerHTML = 'Победа!';}
}


function movement(index) {
    if (CURRENT_PLAY[index + 1] === 0) {
        moveCell(index, index + 1);
    }

    if (CURRENT_PLAY[index - 1] === 0) {
        moveCell(index, index - 1);
    }

    if (CURRENT_PLAY[index + 4] === 0) {
        moveCell(index, index + 4);
    }

    if (CURRENT_PLAY[index - 4] === 0) {
        moveCell(index, index - 4);
    }
}

function moveCell(from, to) {
    var emptyCell = CURRENT_PLAY[from];
    CURRENT_PLAY[from] = CURRENT_PLAY[to];
    CURRENT_PLAY[to] = emptyCell;
    document.getElementById('board').innerHTML = '';
    document.getElementById('victory').innerHTML = '';
    draw();
}

newGame();
