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

function getWinCombination(cells) {
    for (var i = 0; i < cells.length; i++) {
        if (i === 14) {
            cells[i].value = -1;
            cells[i].style.visibility = 'hidden';
        } else {
            if (i === cells.length - 1) {
                cells[i].value = i;
            } else {
                cells[i].value = i + 1;
            }
            cells[i].style.visibility = 'visible';
        }
    }
    [].forEach.call(cells, function(item) {
        neighbours[item.id] = getNeighbourCells(item.id);
    });
    return cells;
}

describe('Tag', function() {
    var clickEvent = document.createEvent('Events');
    clickEvent.initEvent('click', true, false);

    it('should create field 4x4 with 15 visible cells and one hidden', function() {
        var cells = getCells();
        var visibleCells = cells.filter(function(item) {
            return parseInt(item.value) !== -1;
        });
        var hiddenCells = cells.filter(function(item) {
            return parseInt(item.value) === -1;
        });

        expect(visibleCells).to.have.lengthOf(15);
        expect(hiddenCells).to.have.lengthOf(1);
        visibleCells.forEach(function(item, index) {
            expect(document.getElementById((index + 1).toString())).to.eql(item);
        });
    });

    it('should move neighbour cell on empty by click', function() {
        var cells = getCells();
        var hiddenCell = getHiddenCell(cells);
        var expectedHiddenCellValue = hiddenCell.value;
        var neighbour = cells[neighbours[hiddenCell.id][0]];
        var expectedNeighbourValue = neighbour.value;

        neighbour.dispatchEvent(clickEvent);
        expect(neighbour.value).to.eql(expectedHiddenCellValue);
        expect(hiddenCell.style.visibility).to.equal('visible');
        expect(hiddenCell.value).to.eql(expectedNeighbourValue);
        expect(neighbour.style.visibility).to.equal('hidden');
    });

    it('should not move empty cell by click', function() {
        var cells = getCells();
        var hiddenCell = getHiddenCell(cells);
        var expectedHiddenCellValue = hiddenCell.value;

        hiddenCell.dispatchEvent(clickEvent);
        expect(hiddenCell.style.visibility).to.equal('hidden');
        expect(hiddenCell.value).to.eql(expectedHiddenCellValue);
    });

    it('should not move cell that does not have empty cell in neighbours', function() {
        var cells = getCells();
        var hiddenCell = getHiddenCell(cells);
        var cellsWithoutEmpty = cells.filter(function(item) {
            return item.id !== hiddenCell.id;
        });
        var cell = cellsWithoutEmpty.filter(function(item) {
            if (neighbours[item.id].every(function(el) {
                return parseInt(cells[el].value) !== -1;
            })) {
                return item;
            }
        })[0];
        var expectedHiddenCellValue = hiddenCell.value;
        var expectedCellValue = cell.value;

        cell.dispatchEvent(clickEvent);
        expect(cell.value).to.eql(expectedCellValue);
        expect(hiddenCell.value).to.eql(expectedHiddenCellValue);
    });

    it('should show win message', function() {
        var initialCells = getCells();
        var cells = getWinCombination(initialCells);
        var winMessage = document.getElementById('win-message');

        expect(winMessage.style.visibility).to.equal('hidden');
        cells[cells.length - 1].dispatchEvent(clickEvent);
        expect(winMessage.style.visibility).to.equal('visible');
        
        winMessage.style.visibility = 'hidden';
        clearPlayground();
        setupGame();
    });
});