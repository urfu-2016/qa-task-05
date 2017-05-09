var expect = chai.expect;

function getCell(x, y) {
    return $('.main td[data-position="' + x + '_' + y + '"]');
}

describe('Tag', function () {
    var puzzles = null;

    beforeEach(function () {
        puzzles = [
            [6,13,11,14],
            [12,7,3,5],
            [null,10,9,1],
            [8,2,4,15]
        ];
    });

    after(function () {
        startGame();
    });

    it('should show puzzles content', function () {
        startGame(puzzles);

        function stringify(value) {
            return value
                ? value.toString()
                : '';
        }

        for (var i = 0; i < puzzles.length; i ++) {
            for (var j = 0; j < puzzles[i].length; j++) {
                expect(getCell(i, j).text()).to.equal(stringify(puzzles[i][j]));
            }
        }
    });

    it('should move chip after click on neighbour cell', function () {
        startGame(puzzles);

        getCell(1, 0).trigger('click');

        expect(getCell(2, 0).text()).to.equal('12');
        expect(getCell(1, 0).text()).to.be.empty;
        expect(getCell(1, 0).hasClass('empty-cell')).to.be.true;

        getCell(1, 1).trigger('click');

        expect(getCell(1, 0).text()).to.equal('7');
        expect(getCell(1, 1).text()).to.be.empty;
        expect(getCell(1, 1).hasClass('empty-cell')).to.be.true;
    });

    it('should not do anything after click on no-neighbour cell', function () {
        startGame(puzzles);

        function checkClickDoNothing(x, y, expectedValue) {
            getCell(x, y).trigger('click');

            expect(getCell(x, y).text()).to.equal(expectedValue);
            expect(getCell(2, 0).text()).to.be.empty;
        }

        checkClickDoNothing(1, 1, '7');
        checkClickDoNothing(0, 0, '6');
        checkClickDoNothing(3, 3, '15');
    });

    it('should not do anything after click on empty cell', function () {
        startGame(puzzles);

        getCell(2, 0).trigger('click');

        expect(getCell(2, 0).text()).to.be.empty;
    });

    it('should add class `end` after game`s end', function () {
        puzzles = [
            [1,null,2,3],
            [4,5,6,7],
            [8,9,10,11],
            [12,13,14,15]
        ];
        startGame(puzzles);

        expect($('.main').hasClass('end')).to.be.false;

        getCell(0, 0).trigger('click');

        expect($('.main').hasClass('end')).to.be.true;
    });
});
