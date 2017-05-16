chai.should();

describe('Game', function() {
    beforeEach(startGame);

    it('should have `16` tiles on game field', function() {
        gameField.childNodes.length.should.equal(16);
    });

    it('should have hole tile at top left corner when game starts', function() {
        var topLeftTile = document
            .getElementById("game")
            .childNodes[0];
        var expectedTextContent = '';
        
        topLeftTile.textContent.should.equal(expectedTextContent);
    });
    
    it('should move tile near hole', function() {
        var tileIndexBeforeMove = 1;
        var tileValue = tiles[tileIndexBeforeMove];
        
        onTileClick(gameField.childNodes[tileIndexBeforeMove]);
        var tileIndexAfterMove = tiles.indexOf(tileValue);

        tileIndexAfterMove.should.not.equal(tileIndexBeforeMove);
    });

    it('should not move tile not near hole', function() {
        var tileIndexBeforeMove = 15;
        var tileValue = tiles[tileIndexBeforeMove];
        
        onTileClick(gameField.childNodes[tileIndexBeforeMove]);
        var tileIndexAfterMove = tiles.indexOf(tileValue);

        tileIndexAfterMove.should.equal(tileIndexBeforeMove);
    });

    it('should not show win-message when game is not finished', function() {
        var winMessageDiv = document.getElementById('win-message');
        var winMessageDivStyles = window.getComputedStyle(winMessageDiv);

        winMessageDivStyles.visibility.should.equal('hidden');
    });
});
