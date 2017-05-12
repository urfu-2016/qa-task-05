'use strict';

function Game(){
    this.fieldSize = 4;
    this.field = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];

    this.swap = function (ind1, ind2) {
        let tmp = this.field[ind1];
        this.field[ind1] = this.field[ind2];
        this.field[ind2] = tmp;
    };

    function possibleForMoveElementsPositions(field, fieldSize) {
        let hole = field.indexOf(0);
        let positions = [];
        if (hole % fieldSize !== 0) {
            positions.push(hole - 1);
        }
        if (hole % fieldSize !== fieldSize - 1) {
            positions.push(hole + 1);
        }
        if (hole - fieldSize >= 0) {
            positions.push(hole - fieldSize);
        }
        if (hole + fieldSize < field.length) {
            positions.push(hole + fieldSize);
        }

        return positions;
    }

    this.move = function (value) {
        if (value === 0) {
            return false;
        }
        let ind = this.field.indexOf(value);
        if (possibleForMoveElementsPositions(this.field, this.fieldSize).indexOf(ind) === -1) {
            return false;
        }
        let hole = this.field.indexOf(0);
        this.swap(hole, ind);

        return true;
    };

    this.shuffle = function () {
        for (let i = 0; i < 300; i++) {
            let possibleMoves = possibleForMoveElementsPositions(this.field, this.fieldSize);
            let ind = Math.floor(Math.random() * possibleMoves.length);
            let hole = this.field.indexOf(0);
            this.swap(possibleMoves[ind], hole);
        }
    };

    this.isVictory = function () {
        let victoryState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
        for (let i = 0; i < this.field.length; i++) {
            if (victoryState[i] !== this.field[i]) {
                return false;
            }
        }

        return true;
    };
}

function Drawer(game) {
    this.rePaint = function() {
        for (let x = 0; x < game.fieldSize; x++) {
            for (let y = 0; y < game.fieldSize; y++) {
                let value = game.field[x * game.fieldSize + y].toString();
                let cell = document.getElementById((x * game.fieldSize + y).toString());
                if (value === '0') {
                    value = ' ';
                }
                cell.textContent = value;
            }
        }
        if (game.isVictory()) {
            window.alert('VICTORY');
        }
    };

    this.createCells = function() {
        for (let x = 0; x < game.fieldSize; x++) {
            let row = document.createElement('div');
            row.className = 'row';
            document.getElementById('field').appendChild(row);
            for (let y = 0; y < game.fieldSize; y++) {
                let value = game.field[x * game.fieldSize + y].toString();
                let cell = createCell(value, x * game.fieldSize + y, this);
                row.appendChild(cell);
            }
        }
    };

    function createCell(value, id, drawer) {
        if (value === '0') {
            value = ' ';
        }
        console.log(value);
        let cell = document.createElement('div');
        cell.className = 'tile';
        cell.textContent = value;
        cell.id = id.toString();
        cell.addEventListener('click', function () {
            let intValue = cell.textContent === ' ' ? 0 : parseInt(cell.textContent);
            if (game.move(intValue)) {
                drawer.rePaint(cell);
            }
        });

        return cell;
    }
}

let game = new Game();
game.shuffle();
let drawer = new Drawer(game);
drawer.createCells();