'use strict';

describe('Tag', function() {
    var click = document.createEvent('Events');
    click.initEvent('click', true, false);

    it('should generate 15 visible numbered cells', function() {
        var cells = [].slice.call(document.getElementsByClassName('cell'));

        chai.assert.equal(cells.filter(function (item) {
            return item.id !== 'hidden-cell';
        }).length, 15);
        for (var i = 1; i <= 15; i++) {
            chai.expect(document.getElementById('' + i)).to.be.not.an('undefined');
        }
    });

    it('should move neighbour cell on empty on click in horizontal directions', function() {
        var hiddenCell = document.getElementById('hidden-cell');
        var neighbour = [].slice.call(document.getElementsByClassName('cell')).filter(function (cell) {
            return cell.style.top === hiddenCell.style.top
                && parseInt(cell.style.left) - parseInt(hiddenCell.style.left) === 25;
        })[0];

        neighbour.dispatchEvent(click);
        chai.assert.equal(neighbour.style.top, hiddenCell.style.top);
        chai.assert.equal(parseInt(hiddenCell.style.left) - parseInt(neighbour.style.left), 25);
        neighbour.dispatchEvent(click);
        chai.assert.equal(neighbour.style.top, hiddenCell.style.top);
        chai.assert.equal(parseInt(neighbour.style.left) - parseInt(hiddenCell.style.left), 25);
    });

    it('should move neighbour cell on empty on click in vertical directions', function() {
        var hiddenCell = document.getElementById('hidden-cell');
        var neighbour = [].slice.call(document.getElementsByClassName('cell')).filter(function (cell) {
            return cell.style.left === hiddenCell.style.left
                && parseInt(cell.style.top) - parseInt(hiddenCell.style.top) === 25;
        })[0];

        neighbour.dispatchEvent(click);
        chai.assert.equal(neighbour.style.left, hiddenCell.style.left);
        chai.assert.equal(parseInt(hiddenCell.style.top) - parseInt(neighbour.style.top), 25);
        neighbour.dispatchEvent(click);
        chai.assert.equal(neighbour.style.left, hiddenCell.style.left);
        chai.assert.equal(parseInt(neighbour.style.top) - parseInt(hiddenCell.style.top), 25);
    });

    it('should show victory message', function() {
        var hiddenCell = document.getElementById('hidden-cell');
        var victory = document.getElementById('victory');
        var cells = [];
        var leftPosition = 0;
        var topPosition = 0;
        checkVictory();

        chai.assert.equal(victory.style.visibility, 'hidden');

        for (var i = 0; i < 15; i++) {
            cells[i] = document.getElementById('' + (i + 1));
        }
        assignCells(cells);
        hiddenCell.style.left = '75%';
        hiddenCell.style.top = '75%';
        checkVictory();

        chai.assert.equal(victory.style.visibility, 'visible');

        victory.style.visibility = 'hidden';
        hiddenCell.style.left = '0';
        hiddenCell.style.top = '0';
        cells.unshift(hiddenCell);
        shuffle(cells);
        assignCells(cells);
    });

    it('shouldn\'t move empty cell only', function() {
        var hiddenCell = document.getElementById('hidden-cell');
        var hiddenCellLeft = hiddenCell.style.left;
        var hiddenCellTop = hiddenCell.style.top;

        hiddenCell.dispatchEvent(click);

        chai.assert.equal(hiddenCell.style.left, hiddenCellLeft);
        chai.assert.equal(hiddenCell.style.top, hiddenCellTop);
    });

    it('shouldn\'t move cell that is remote from empty on the same row', function() {
        var hiddenCell = document.getElementById('hidden-cell');
        var remoteCell = [].slice.call(document.getElementsByClassName('cell')).filter(function(cell) {
            return cell.style.top === hiddenCell.style.top
                    && parseInt(cell.style.left) - parseInt(hiddenCell.style.left) > 25;
        })[0];
        var remoteCellLeft = remoteCell.style.left;
        var hiddenCellLeft = hiddenCell.style.left;

        remoteCell.dispatchEvent(click);

        chai.assert.equal(hiddenCell.style.left, hiddenCellLeft);
        chai.assert.equal(remoteCell.style.left, remoteCellLeft);
    });

    it('shouldn\'t move cell that is remote from empty on the same column', function() {
        var hiddenCell = document.getElementById('hidden-cell');
        var remoteCell = [].slice.call(document.getElementsByClassName('cell')).filter(function(cell) {
            return cell.style.left === hiddenCell.style.left
                && parseInt(cell.style.top) - parseInt(hiddenCell.style.top) > 25;
        })[0];
        var remoteCellTop = remoteCell.style.top;
        var hiddenCellTop = hiddenCell.style.top;

        remoteCell.dispatchEvent(click);

        chai.assert.equal(hiddenCell.style.top, hiddenCellTop);
        chai.assert.equal(remoteCell.style.top, remoteCellTop);
    });
});
