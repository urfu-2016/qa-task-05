chai.should();

function assertChips() {
    var gameField = document.getElementById('game-field');
    gameField.childElementCount.should.be.equal(SIZE_FIELD*SIZE_FIELD);

    for (var i = 0; i < SIZE_FIELD*SIZE_FIELD; i++) {
        var currentChip = gameField.childNodes[i];
        currentChip.innerHTML.should.be.equal(currentCombination[i].toString());
        currentChip.className.should.be.contains('chip');
    }
}

describe('Game ui tests', function() {
    beforeEach(function () {
        assertChips();
    });

    afterEach(function () {
        document.getElementById('start-game-button').click();
    });

    it('should create game', function () {
        var combinationsField = currentCombination.slice();
        for (var i = 0; i < SIZE_FIELD*SIZE_FIELD; i++) {
            combinationsField.splice(combinationsField.indexOf(i), 1);
        }
        combinationsField.length.should.be.equal(0);
    });

    it('should render game when chip move', function () {
        var gameField = document.getElementById('game-field');
        var indexEmpty = currentCombination.indexOf(0);
        var empty = gameField.childNodes[indexEmpty];
        empty.click();
    });

    it('should render "result" is empty', function () {
        document.getElementById('game-field').childNodes[2].click();
        var result = document.getElementById('result');
        result.innerText.should.be.equal('');
    });

    it('should render "Вы выиграли!" when game complete', function () {
        currentCombination = [1, 2, 3, 4,
                               5, 6, 7, 8,
                               9, 10, 11, 12,
                               13, 14, 0, 15];
        render();
        document.getElementById('game-field').childNodes[15].click();

        var result = document.getElementById('result');
        result.innerText.should.be.equal('Вы выиграли!');
    });

    it('should not change with an empty chip', function () {
        var exampleCombination = [15, 1, 3, 4,
                                    8, 6, 7, 5,
                                    12, 10, 11, 9,
                                    13, 14, 0, 2];

        currentCombination = exampleCombination.slice();
        render();
        document.getElementById('game-field').childNodes[14].click();
        var gameField = document.getElementById('game-field');
        var empty = gameField.childNodes[14];
        empty.click();

        JSON.stringify(exampleCombination).should.be.equal(JSON.stringify(currentCombination));
    });

    it('should not change with an fixed chip', function () {
        var exampleCombination = [15, 1, 3, 4,
                                    8, 6, 7, 5,
                                    12, 10, 11, 9,
                                    13, 14, 0, 2];

        currentCombination = exampleCombination.slice();
        render();
        document.getElementById('game-field').childNodes[0].click();
        var gameField = document.getElementById('game-field');
        var fixedChip = gameField.childNodes[0];
        fixedChip.click();

        JSON.stringify(exampleCombination).should.be.equal(JSON.stringify(currentCombination));
    });
});
