var expect = chai.expect;

function getCell(x, y) {
    return $('.main td[data-position="' + x + '_' + y + '"]');
}

function getCellText(x, y) {
    return getCell(x, y).text();
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

        startGame(puzzles);
    });

    it('should show puzzles content', function () {
        function stringify(value) {
            return value
                ? value.toString()
                : '';
        }

        for (var i = 0; i < 4; i ++) {
            for (var j = 0; j < 4; j++) {
                var actual = getCellText(i, j);
                var expected = stringify(puzzles[i][j]);

                expect(actual).to.equal(expected);
            }
        }
    });

    it('should move chip after click on neighbour cell', function () {
        getCell(1, 0).trigger('click');

        expect(getCellText(2, 0)).to.equal('12');
        expect(getCellText(1, 0)).to.be.empty;
        expect(getCell(1, 0).hasClass('empty-cell')).to.be.true;
    });

    it('should not do anything after click on no-neighbour cell', function () {
        function checkClickDoNothing(x, y, expectedValue) {
            getCell(x, y).trigger('click');

            expect(getCellText(x, y)).to.equal(expectedValue);
            expect(getCellText(2, 0)).to.be.empty;
        }

        checkClickDoNothing(1, 1, '7');
        checkClickDoNothing(0, 0, '6');
        checkClickDoNothing(3, 3, '15');
    });

    it('should not do anything after click on empty cell', function () {
        getCell(2, 0).trigger('click');

        expect(getCellText(2, 0)).to.be.empty;
    });

    it('should add class `end` after game`s end', function () {
        var puzzles = [
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
