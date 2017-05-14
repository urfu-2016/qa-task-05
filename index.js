window.onload = function() {
    startGame();
};

function startGame(puzzle) {
    $('.main')
        .removeClass('end')
        .off('click', 'td')
        .empty();

    puzzle = puzzle || createPuzzle();
    var cellsTable = createTable();
    redrawTable(puzzle, cellsTable);

    registerClickHandler(puzzle, cellsTable);
}

function createPuzzle() {
    var valuesList = [];

    for (var i = 1; i <= 15; i++) {
        valuesList.push(i);
    }

    valuesList = valuesList.sort(function () {
        return 0.5 - Math.random();
    });

    var puzzle = [];

    for (var y = 0; y < 4; y++) {
        var row = [];

        for (var x = 0; x < 4; x++) {
            const value = y === 0 && x === 0
                ? null
                : valuesList.shift();

            row.push(value);
        }

        puzzle.push(row);
    }

    return puzzle;
}

function createTable() {
    var table = [];

    for (var y = 0; y < 4; y++) {
        var row = $('<tr/>');
        var rowCells = [];

        for (var x = 0; x < 4; x++) {
            var cell = $('<td/>', {
                'data-position': y + '_' + x
            });

            row.append(cell);
            rowCells.push(cell);
        }

        $('.main').append(row);
        table.push(rowCells);
    }

    return table;
}

function redrawTable(puzzle, table) {
    for (var y = 0; y < 4; y++) {
        for (var x = 0; x < 4; x++) {
            const newValue = puzzle[x][y];
            const element = table[x][y];
            const oldValue = element.data('value');

            if (newValue !== oldValue) {
                element.data('value', newValue);
                element.text(newValue);

                if (newValue === null || oldValue === null) {
                    element.toggleClass('empty-cell')
                }
            }
        }
    }
}

function registerClickHandler(puzzle, table) {
    $('.main').on('click', 'td', function () {
        var position = this.getAttribute('data-position')
            .split('_')
            .map(Number);

        updatePuzzleAfterClick(puzzle, position[0], position[1]);
        redrawTable(puzzle, table);

        if (isGameEnd(puzzle)) {
            $('.main').off('click', 'td');
            showGameEnd();
        }
    });
}

function updatePuzzleAfterClick(puzzle, x, y) {
    if (puzzle[x][y] === null) {
        return puzzle;
    }

    var neighboursPositions = getNeighboursPositions(x, y);

    for (var i = 0; i < neighboursPositions.length; i++) {
        var pos = neighboursPositions[i];

        if (puzzle[pos.x][pos.y] === null) {
            switchValues(puzzle, pos, { x: x, y: y })
        }
    }

    return puzzle;
}

function getNeighboursPositions(x, y) {
    return [
        [x, y + 1],
        [x, y - 1],
        [x + 1, y],
        [x - 1, y]
    ]
        .map(function (positions) {
            return {
                x: positions[0],
                y: positions[1]
            };
        })
        .filter(function (position) {
            return isInField(position.x, position.y);
        });
}

function isInField(x, y) {
    return [x, y].every(function (index) {
        return index >= 0 && index <= 3;
    })
}

function switchValues(puzzle, pos1, pos2) {
    var tmp = puzzle[pos1.x][pos1.y];

    puzzle[pos1.x][pos1.y] = puzzle[pos2.x][pos2.y];
    puzzle[pos2.x][pos2.y] = tmp;
}

function isGameEnd(puzzle) {
    var oldValue = 0;

    for (var i = 0; i < puzzle.length; i++) {
        for (var j = 0; j < puzzle[i].length; j++) {
            var currentValue = puzzle[i][j];

            if (currentValue === null) {
                continue;
            }

            if (currentValue < oldValue) {
                return false;
            }

            oldValue = currentValue;
        }
    }

    return true;
}

function showGameEnd() {
    $('.main').addClass('end');
}
