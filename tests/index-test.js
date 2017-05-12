'use strict';
chai.should();

describe('Tag', function() {
    it('should show 16 cells', function () {
        let cells = document.getElementsByClassName('elem');
        cells.should.have.length(16);
    });

    it('should create cells with one empty element', function () {
        let cells = [].slice.call(document.getElementsByClassName('elem'));
        cells = cells.filter(function (cell) {
            return cell.textContent === "";
        });
        cells.should.have.length(1);
    });

    it('should move cell', function () {
        let empty = findEmptyElement(mainField);
        let elemPosition = getNeighbors(empty)[0];
        let id = elemPosition.x * 4 + elemPosition.y;
        trySwap(id.toString());
        chai.assert.equal(mainField[elemPosition.x][elemPosition.y], 0);
    });

    it('should be victory', function() {
        let field = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 0]
        ];
        chai.expect(isGameOver(field)).to.be.true;
    });
});
