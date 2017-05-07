'use strict';

var BOARD_SIZE = 4;

function View(game) {
    this.render = function() {
        var puzzle = document.getElementById('gempuzzle');
        puzzle.innerHTML = '';

        for (var row = 0; row < BOARD_SIZE; row++) {
            var rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            puzzle.appendChild(rowDiv);
            for (var collumn = 0; collumn < BOARD_SIZE; collumn++) {
                var number = game.getNumber(row, collumn);
                var tileDiv = createTileElement(number);
                tileDiv.onclick = cellClick.bind(this, row, collumn);
                rowDiv.appendChild(tileDiv);
            }
        }

        if (game.isCompleted()) {
            var result = document.getElementById('result');
            result.innerText = 'Winnner!';
        }
    };

    function createTileElement(number) {
        var tile = document.createElement('div');
        tile.className = number ? 'tile' : 'tile empty';
        tile.innerText = number;
        return tile;
    }

    function cellClick(row, collumn) {
        game.tryMove(row, collumn) && this.render();
    }
}

function Game() {
    var COMPLETED_BOARD = JSON.stringify([[1, 2, 3, 4], 
                                          [5, 6, 7, 8], 
                                          [9, 10, 11, 12], 
                                          [13, 14, 15, 0]]);

    this.board = JSON.parse(COMPLETED_BOARD);

    this.zero = new Location(3, 3);

    this.getNumber = function(row, collumn) {
        if (this.board[row]) {
            return this.board[row][collumn];
        }
    };

    this.isCompleted = function() {
        return JSON.stringify(this.board) === COMPLETED_BOARD;
    };

    this.tryMove = function(row, collumn) {
        if (!this.getNumber(row, collumn)) {
            return false;
        }

        var location = new Location(row, collumn);
        if (location.manhettenDistanceTo(this.zero) !== 1) {
            return false;
        }

        swap(this.board, location, this.zero);
        this.zero = location;
        return true;
    };

    function swap(board, from, to) {
        var temp = board[to.row][to.collumn];
        board[to.row][to.collumn] = board[from.row][from.collumn];
        board[from.row][from.collumn] = temp;
    }

    this.shuffle = function() {
        for (var i = 0; i < 10000; i++) {
            this.performRandomMove();
        }
    };

    this.performRandomMove = function() {
        var isVertical = Math.round(Math.random());
        var direction = Math.round(Math.random()) ? 1 : -1;

        if (isVertical) {
            this.tryMove(this.zero.row + direction, this.zero.collumn);
        } else {
            this.tryMove(this.zero.row, this.zero.collumn + direction);
        }
    };
}

function Location(row, collumn) {
    this.row = row;
    this.collumn = collumn;

    this.manhettenDistanceTo = function(other) {
        return Math.abs(this.row - other.row) + Math.abs(this.collumn - other.collumn);
    };
}

var game = new Game();
game.shuffle();
var view = new View(game);

view.render();