'use strict';

function View(game) {
    this.update = function() {
        var puzzle = document.getElementById('gempuzzle');
        puzzle.innerHTML = '';

        for (var row = 0; row < 4; row++) {
            var rowDiv = createDiv('grid-row');
            puzzle.appendChild(rowDiv);
            for (var collumn = 0; collumn < 4; collumn++) {
                var number = game.grid[row][collumn];
                var tileDiv = createTileDiv(number);
                tileDiv.onclick = cellClick.bind(this, row, collumn);
                rowDiv.appendChild(tileDiv);
            }
        }
    };

    function createTileDiv(number) {
        var tileDiv = createDiv('grid-cell');
        tileDiv.innerText = number;
        if (!number) {
            tileDiv.className = 'grid-cell empty';
        }

        return tileDiv;
    }

    function cellClick(row, collumn) {
        var isMove = game.tryMove(row, collumn);
        isMove && this.update();
    }
}

function Game() {
    this.grid = [[1, 2, 3, 4], 
                 [5, 6, 7, 8], 
                 [9, 10, 11, 12], 
                 [13, 14, 15, 0]];

    this.zero = new Location(3, 3);

    this.tryMove = function(row, collumn) {
        var location = new Location(row, collumn);
        if (location.manhettenDistanceTo(this.zero) === 1) {
            swap(this.grid, location, this.zero);
            this.zero = location;
            return true;
        }
    };

    function swap(grid, from, to) {
        var temp = grid[to.row][to.collumn];
        grid[to.row][to.collumn] = grid[from.row][from.collumn];
        grid[from.row][from.collumn] = temp;
    }
}

function Location(row, collumn) {
    this.row = row;
    this.collumn = collumn;

    this.manhettenDistanceTo = function(other) {
        return Math.abs(this.row - other.row) + Math.abs(this.collumn - other.collumn);
    };
}

function createDiv(className) {
    var div = document.createElement('div');
    div.className = className;

    return div;
}


var game = new Game();
var view = new View(game);

view.update();