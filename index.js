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
        if (i === 0)
            element.style.visibility = 'hidden';
        if ((i + 1) % 4 === 0) {
            field.appendChild(document.createElement('br'));
        }
    }
}

function isEnd() {
    for (var i = 0; i < cells.length - 1; i++) {
        if (parseInt(cells[i].value) !== i + 1)
            return false;
    }
    return true;
}

function swapCells(current, target) {
    target.style.visibility = 'visible';
    target.value = current.value;
    current.value = -1;
    current.style.visibility = 'hidden';
    var t = parseInt(current.value);
    cells[cells.indexOf(parseInt(current.value))] = target.value;
    cells[cells.indexOf(parseInt(target.value))] = t;
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
    var currentID = cells.indexOf(parseInt(event.target.value));
    if (parseInt(htmlCells[currentID - 1].value) === -1)
        swapCells(htmlCells[currentID], htmlCells[currentID - 1]);
    if (parseInt(htmlCells[currentID + 1].value) === -1)
        swapCells(htmlCells[currentID], htmlCells[currentID + 1]);
    if (parseInt(htmlCells[currentID - 4].value) === -1)
        swapCells(htmlCells[currentID], htmlCells[currentID - 4]);
    if (parseInt(htmlCells[currentID + 4].value) === -1)
        swapCells(htmlCells[currentID], htmlCells[currentID + 4]);
    if (isEnd()) {
        var note = document.getElementById('winner-note');
        note.setAttribute('visibility', 'visible');
    }
}

initGameField();
