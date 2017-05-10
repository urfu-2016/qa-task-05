function getCombination() {
    var combination = [];
    for (var i = 1; i < 16; i++) {
        combination.push(i);
    }

    combination.sort(function () {
        return 0.5 - Math.random();
    });

    return [16].concat(combination);
}

function generateCombination() { 
    var combination;
    var inv = 1;

    while (inv % 2 !== 0) {
        inv = 0;
        combination = getCombination();

        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < i; j++) {
                if (combination[j] > combination[i]) {
                    inv++;
                }
            }
        }
    }

    return combination;
}

function getPosition(i) {
    return {row: Math.floor(i / 4), column:  i % 4};
}    

function createCell(value, i) {
    var cell = document.createElement('div');
    cell.className = 'block cell';
    
    var xy = getPosition(i);
    cell.style.top = (25 * xy.row + 1) + '%'; 
    cell.style.left = (25 * xy.column + 1) + '%';
    if (value === 16) {
        cell.style.visibility = 'hidden';
    } else {
        cell.innerHTML = value;
    }

    return cell;
}
    
function createWinMessage() {
    var div = document.createElement('div');
    div.innerHTML = "You win";
    div.className = 'block win-message';
    
    return div;
}

function isNeighbors(i, j) {
    var p1 = getPosition(i);
    var p2 = getPosition(j);
    return Math.abs(p1.row - p2.row) + Math.abs(p1.column - p2.column) === 1;
}    

function swap(array, i, j) {
    var e = array[i];
    array[i] = array[j];
    array[j] = e;
}
    
function swapCellStyle(cellOne, cellTwo, property) {
    var styleProperty = cellOne.style[property];
    cellOne.style[property] = cellTwo.style[property];
    cellTwo.style[property] = styleProperty;
}

function isWin(combination) {
    for (var i = 1; i < combination.length; i++) {
        if (combination[i-1] > combination[i]) {
            return false;
        }
    }     

    return true;
}

var combination;

function init() {
    combination = generateCombination();
    var cells = combination.map(createCell);
    var emptyCellIndex = combination.indexOf(16);
    var game = document.getElementById('game');
    
    game.innerHTML = "";
    
    cells.forEach(function(cell) {
        game.appendChild(cell);
    });
    
    game.className = 'cells';
    game.onclick = function(e) {
        event = e || window.event;
        var div = event.target || event.srcElement;
        
        if (!div.classList.contains('cell')) {
            return;
        }
        
        var cellIndex = cells.indexOf(div);
        if (isNeighbors(cellIndex, emptyCellIndex)) {
                swap(cells, cellIndex, emptyCellIndex);
                swap(combination, cellIndex, emptyCellIndex);
                swapCellStyle(cells[cellIndex], cells[emptyCellIndex], 'top');
                swapCellStyle(cells[cellIndex], cells[emptyCellIndex], 'left');
                emptyCellIndex = cellIndex;
            if (isWin(combination)) {
                game.appendChild(createWinMessage());
                game.onclick = "";
                cells.forEach(function(cell) {
                    cell.style.opacity = '.5';
                });
            }
        }
    };
}
    
document.body.onload = init();
