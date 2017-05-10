// Логику пятнашек нужно описать в этом файле
var cells;

function initGameField() {
    getShuffledField();
    var field = document.getElementById('game-field');
    for (var i = 0; i < 16; i++) {
        var element = document.createElement('input');
        element.setAttribute('class', 'cell');
        element.setAttribute('type', 'button');
        element.setAttribute('value', cells[i]);
        element.addEventListener('click', onClick);
        field.appendChild(element);
        if (cells[i] === -1)
            element.style.visibility = 'hidden';
        if ((i + 1) % 4 === 0) {
            field.appendChild(document.createElement('br'));
        }
    }
}

function isEnd(array) {
    for (var i = 0; i < array.length - 1; i++) {
        if (parseInt(array[i].value) !== i + 1)
            return false;
    }
    return true;
}

function swapCells(current, target) {
    target.style.visibility = 'visible';
    target.value = current.value;
    current.value = -1;
    current.style.visibility = 'hidden';

}

function getShuffledField() {
    cells = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    cells.unshift(-1);
}

function shuffleArray(cells) {
    for (var i = cells.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cells[i];
        cells[i] = cells[j];
        cells[j] = temp;
    }
    return cells;
}

function onClick(event) {
    var field = document.getElementById('game-field');
    var htmlCells = field.getElementsByClassName('cell');
    var array = Array.prototype.slice.call(htmlCells, 0);
    var currentID = array.indexOf(event.target);
    if (currentID - 1 >= 0 && currentID % 4 !== 0 && array[currentID - 1].value === '-1')
        swapCells(array[currentID], array[currentID - 1]);
    else if (currentID + 1 <= 15 && currentID + 1 !== 0 && array[currentID + 1].value === '-1')
        swapCells(array[currentID], array[currentID + 1]);
    else if (currentID - 4 >= 0 && array[currentID - 4].value === '-1')
        swapCells(array[currentID], array[currentID - 4]);
    else if (currentID + 4 <= 15 && array[currentID + 4].value === '-1')
        swapCells(array[currentID], array[currentID + 4]);
    if (isEnd(array)) {
        var note = document.getElementById('winner-note');
        note.style.visibility = 'visible';
        array.forEach(function (element) {
            element.disabled = true;
        })
    }
}

initGameField();
