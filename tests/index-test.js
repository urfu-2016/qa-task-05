var expect = chai.expect;

function getCells() {
    return [].map.call(document.getElementsByClassName('button'), function(item) {
            return item;
        });
}

function getHiddenCell(cells) {
    return cells.filter(function(item) {
        return parseInt(item.value) === -1;
    })[0];
}

function clearPlayground() {
    var playground = document.getElementById('playground');
    playground.innerHTML = '';
}

function isUniqueNumbers(numbers) {
    var array = new Array(numbers.length);
    for (var i = 0; i < array.length; array[i++] = 0);
    numbers.forEach(function(item) {
        array[item-1]++;
    });
    return array.every(function(item) {
        return item === 1;
    });
}

function hasClass(item, cls) {
    return item.className.indexOf(cls) !== -1;
}

describe('Game tests', function() {
    var clickEvent = document.createEvent('Events');
    clickEvent.initEvent('click', true, false);
    var cells;
    var hiddenCell;

    beforeEach(function() {
        clearPlayground();
        setupGame();
        cells = getCells();
        hiddenCell = getHiddenCell(cells);
    });

    it('should create field 4x4 with 15 visible cells and one hidden', function() {
        var visibleCells = cells.filter(function(item) {
            return parseInt(item.value) !== -1;
        });
        var hiddenCells = cells.filter(function(item) {
            return parseInt(item.value) === -1;
        });
        var cellsNumbers = visibleCells.map(function(item) {
            return parseInt(item.value);
        });

        expect(visibleCells).to.have.lengthOf(15);
        expect(hiddenCells).to.have.lengthOf(1);
        expect(isUniqueNumbers(cellsNumbers)).to.be.true;
    });

    it('should move neighbour cell on empty by click', function() {
        setGameField([
            -1, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            12, 13, 14, 15
        ]);
        fillCells(cells);
        hiddenCell = cells[0];
        var expectedHiddenCellValue = hiddenCell.value;
        var neighbour = cells[1];
        var expectedNeighbourValue = neighbour.value;

        neighbour.dispatchEvent(clickEvent);
        expect(neighbour.value).to.eql(expectedHiddenCellValue);
        expect(hasClass(hiddenCell, 'hidden')).to.be.false;
        expect(hiddenCell.value).to.eql(expectedNeighbourValue);
        expect(hasClass(neighbour, 'hidden')).to.be.true;
    });

    it('should not move empty cell by click', function() {
        var expectedHiddenCellValue = hiddenCell.value;

        hiddenCell.dispatchEvent(clickEvent);
        expect(hasClass(hiddenCell, 'hidden')).to.be.true;
        expect(hiddenCell.value).to.eql(expectedHiddenCellValue);
    });

    it('should not move cell that does not have empty cell in neighbours', function() {
        setGameField([
            -1, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 10, 11,
            12, 13, 14, 15
        ]);
        fillCells(cells);
        hiddenCell = cells[0];
        var cell = cells[2];
        var expectedHiddenCellValue = hiddenCell.value;
        var expectedCellValue = cell.value;

        cell.dispatchEvent(clickEvent);
        expect(cell.value).to.eql(expectedCellValue);
        expect(hiddenCell.value).to.eql(expectedHiddenCellValue);
    });

    it('should show win message', function() {
        setGameField([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, -1, 15
        ]);
        fillCells(cells);
        hiddenCell = cells[cells.length - 2];
        var winMessage = document.getElementById('win-message');

        expect(hasClass(winMessage, 'hidden')).to.be.true;
        cells[cells.length - 1].dispatchEvent(clickEvent);
        expect(hasClass(winMessage, 'visible')).to.be.true;
        
        winMessage.className = 'hidden';
        clearPlayground();
        setupGame();
    });
});