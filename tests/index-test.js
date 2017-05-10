var expect = chai.expect;


function clearPlayground() {
    var playground = document.getElementById('playground');
    playground.innerHTML = '';
}

describe('Game', function() {
    var clickEvent = document.createEvent('Events');
    clickEvent.initEvent('click', true, false);
    var cells = [];
    var hiddenCell = null;
    var cellsWithoutEmpty = null;
    clearPlayground();
    beforeEach(function () {
        startGame();
        cells = [].slice.call(document.getElementsByClassName('button'));
        hiddenCell = cells.filter(function(item) {
            return parseInt(item.value) === -1;
        })[0];
        cellsWithoutEmpty = cells.filter(function(item) {
            return item.value !== -1;
        });
    });
    afterEach(function () {
        clearPlayground();
    });
    after(function () {
       startGame();
    });

    it('should 1 hidden and 15 visible cells', function() {
        cells = [].slice.call(document.getElementsByClassName('button'));
        chai.expect(cells.filter(function(item) {
            return item.style.visibility === 'hidden';
        })).to.have.length(1);
        chai.expect(cells.filter(function(item) {
            return item.style.visibility === 'visible';
        })).to.have.length(15);
    });

    it('should move the cell to a neighboring empty cell', function() {
        var neighboursOfHiddenCell = cells.filter(function(item) {
            return getEmptyCellId(item.id, cells) !== -1;
        });

        var hiddenCellValue = hiddenCell.value;
        neighboursOfHiddenCell.forEach(function (neighbour) {
            var neighbourValue = neighbour.value;

            neighbour.dispatchEvent(clickEvent);
            expect(neighbour.value).to.eql(hiddenCellValue);
            expect(hiddenCell.style.visibility).to.equal('visible');
            expect(hiddenCell.value).to.eql(neighbourValue);
            expect(neighbour.style.visibility).to.equal('hidden');
            hiddenCell.dispatchEvent(clickEvent);
        });
    });



    it('shouldn\'t move empty cell by click', function() {
        var hiddenCell = cells.filter(function(item) {
            return parseInt(item.value) === -1;
        })[0];
        var expectedHiddenCellValue = hiddenCell.value;

        hiddenCell.dispatchEvent(clickEvent);
        expect(hiddenCell.style.visibility).to.equal('hidden');
        expect(hiddenCell.value).to.eql(expectedHiddenCellValue);
    });

    it('shouldn\'t move cells, which have no empty neighboring cells', function() {
        var cellsWithoutEmptyNeighbour = cells.filter(function(item) {
            return getEmptyCellId(item.id, cells) === -1 && parseInt(item.value) !== -1;
        });
        var HiddenCellValue = hiddenCell.value;

        cellsWithoutEmptyNeighbour.forEach(function(cell) {
            cell.dispatchEvent(clickEvent);
            var CellValue = cell.value;
            expect(cell.value).to.eql(CellValue);
            expect(hiddenCell.value).to.eql(HiddenCellValue);
        });

    });

    it('should show win message', function() {
        var board = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, -1],
            [13, 14, 15, 12]
        ];
        clearPlayground();
        startGame(board);
        cells = [].slice.call(document.getElementsByClassName('button'));
        var winMessage = document.getElementById('win');
        expect(winMessage.style.visibility).to.equal('hidden');
        cells[cells.length - 1].dispatchEvent(clickEvent);
        expect(winMessage.style.visibility).to.equal('visible');
		winMessage.style.visibility = 'hidden';
    });
});