'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var hiddenCell = document.getElementById('hidden-cell');
    var victory = document.getElementById('victory');
    var cells = [];
    cells.push(hiddenCell);

    var cellsFragment = document.createDocumentFragment();
    for (var i = 1; i <= 15; i++) {
        var newCell = document.createElement('div');
        newCell.id = '' + i;
        newCell.className = 'cell';
        newCell.appendChild(document.createTextNode('' + i));
        cellsFragment.appendChild(newCell);
        cells.push(newCell);
    }
    document.getElementById('cells-board').appendChild(cellsFragment);

    shuffle(cells);
    assignCells(cells);
});

function assignCells(cells) {
    var topPosition = 0;
    var leftPosition = 0;
    for (var j = 0; j < cells.length; j++) {
        cells[j].style.left = leftPosition + '%';
        cells[j].style.top = topPosition + '%';
        cells[j].addEventListener('click', moveCell);
        leftPosition += 25;
        if (leftPosition >= 100) {
            topPosition += 25;
            leftPosition = 0;
        }
    }
}

function shuffle(arr) {
    var i, j, item;
    for (i = arr.length; i; i--) {
        j = Math.floor(Math.random() * i);
        if (j !== 0) {
            item = arr[i - 1];
            arr[i - 1] = arr[j];
            arr[j] = item;
        }
    }
}

function moveCell() {
    var hiddenCell = document.getElementById('hidden-cell');
    if (this === hiddenCell) {
        return;
    }
    var temp;
    if (this.style.top === hiddenCell.style.top
        && (Math.abs(parseInt(this.style.left)
            - parseInt(hiddenCell.style.left)) === 25)) {
        temp = this.style.left;
        this.style.left = hiddenCell.style.left;
        hiddenCell.style.left = temp;
    } else if (this.style.left === hiddenCell.style.left
        && (Math.abs(parseInt(this.style.top)
            - parseInt(hiddenCell.style.top)) === 25)) {
        temp = this.style.top;
        this.style.top = hiddenCell.style.top;
        hiddenCell.style.top = temp;
    } else {
        var oldClassName = this.className;
        this.className += ' cell-error';
        setTimeout(function() {
            this.className = oldClassName;
        }.bind(this), 500);
    }
    checkVictory();
}

function checkVictory() {
    var cells = [].slice.call(document.getElementsByClassName('cell'));
    var victory = document.getElementById('victory');

    for (var i = 0; i < cells.length; i++) {
        var cellId = parseInt(cells[i].id);
        if (!isNaN(cellId) && ((cellId - 1) % 4 * 25 !== parseInt(cells[i].style.left)
            || Math.floor((cellId - 1) / 4) * 25 !== parseInt(cells[i].style.top))) {
            victory.style.visibility = 'hidden';
            return;
        }
    }
    victory.style.visibility = 'visible';
}
