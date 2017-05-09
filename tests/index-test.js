chai.should();

function assertChips() {
    var gameField = document.getElementById('game-field');
    gameField.childElementCount.should.be.equal(SIZE_FIELD*SIZE_FIELD);

    for (var i = 0; i < SIZE_FIELD*SIZE_FIELD; i++) {
        var currentChip = gameField.childNodes[i];
        currentChip.innerHTML.should.be.equal(CURRENT_COMBINATION[i].toString());
        currentChip.className.should.be.contains('chip');
    }
}

describe('Game ui tests', function() {
    it('should create game', function () {
        assertChips();
    });

    it('should render game when chip move', function () {
        var gameField = document.getElementById('game-field');
        var indexEmpty = CURRENT_COMBINATION.indexOf(0);
        var empty = gameField.childNodes[indexEmpty];
        empty.click();

        assertChips();
    });

    it('should render game when chip move', function () {
        var gameField = document.getElementById('game-field');
        var indexEmpty = CURRENT_COMBINATION.indexOf(0);
        var empty = gameField.childNodes[indexEmpty];
        empty.click();

        assertChips();
    });

    it('should render "result" is empty', function () {
        document.getElementById('game-field').childNodes[2].click();
        var result = document.getElementById('result');
        result.innerText.should.be.not.equal('Вы выиграли!');
    });

    it('should render "Вы выиграли!" when game complete', function () {
        CURRENT_COMBINATION = [1, 2, 3, 4,
                               5, 6, 7, 8,
                               9, 10, 11, 12,
                               13, 14, 0, 15];
        render();
        document.getElementById('game-field').childNodes[15].click();

        var result = document.getElementById('result');
        result.innerText.should.be.equal('Вы выиграли!');
        document.getElementById('start-game-button').click();
    })

});
