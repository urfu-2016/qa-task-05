chai.should();

function getTileDiv(row, collumn) {
    return document.getElementById('puzzle')
        .childNodes[row]
        .childNodes[collumn];
}

function assertTiles() {
    for (var row = 0; row < BOARD_SIZE; row++) {
        for (var collumn = 0; collumn < BOARD_SIZE; collumn++) {
            var tile = getTileDiv(row, collumn);
            var expectedNumber = game.getNumber(row, collumn).toString();

            tile.innerHTML.should.be.equal(expectedNumber);
            tile.className.should.be.contains('tile');
        }
    }

    var emptyTile = getTileDiv(game.zero.row, game.zero.collumn);
    emptyTile.className.should.contains('empty');
}

describe('Gempuzzle ui tests', function() {
    afterEach(function() {
        game.shuffle();
        view.render();
    });

    it('should render tiles', function() {
        assertTiles();
    });

    it('should rerender tiles when tile move', function() {
        getTileDiv(1, 0).click();

        assertTiles();
    });

    it('should not render `Winnner!` when game not complete', function() {
        var result = document.getElementById('result');
        result.innerText.should.be.not.equal('Winnner!');
    });

    it('should not render `Winnner!` when game not complete after move', function() {
        getTileDiv(1, 0).click();
        
        var result = document.getElementById('result');
        result.innerText.should.be.not.equal('Winnner!');
    });

    it('should render `Winnner!` when geme complete', function() {
        try {
            var realIsCompleted = game.isCompleted;
            game.isCompleted = function() { return true; };
            getTileDiv(0, 1).click();

            var resultText = document.getElementById('result').innerText;
            resultText.should.be.equal('Winnner!');
        } finally {
            game.isCompleted = realIsCompleted;
        }
    });
});
