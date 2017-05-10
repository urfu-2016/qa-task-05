describe('Tag', function() {
    after(function() {
        gameBoard = createBoard();
        printBoard();
    });

    it('should initialize a game field', function () {
        var gameCells = document.getElementsByClassName('game-cell');
        chai.assert.equal(gameCells.length, 16);
    });

    it('should be an empty cell', function () {
        var emptyCells = document.getElementsByClassName('empty');
        chai.assert.equal(emptyCells.length, 1);
    });

    it('should move cell up', function () {
        var gameBoardCopy = gameBoard.slice();
        gameBoardCopy[0] = gameBoardCopy[4];
        gameBoardCopy[4] = 0;
        var cell = document.getElementById('4');
        cell.click();
        chai.assert.deepEqual(gameBoardCopy, gameBoard);
    });
    
    it('should move cell down', function () {
        var gameBoardCopy = gameBoard.slice();
        gameBoardCopy[4] = gameBoardCopy[0];
        gameBoardCopy[0] = 0;
        var cell = document.getElementById('0');
        cell.click();
        chai.assert.deepEqual(gameBoardCopy, gameBoard);
    });

    it('should move cell left', function () {
        var gameBoardCopy = gameBoard.slice();
        gameBoardCopy[0] = gameBoardCopy[1];
        gameBoardCopy[1] = 0;
        var cell = document.getElementById('1');
        cell.click();
        chai.assert.deepEqual(gameBoardCopy, gameBoard);
    });

    it('should move cell right', function () {
        var gameBoardCopy = gameBoard.slice();
        gameBoardCopy[1] = gameBoardCopy[0];
        gameBoardCopy[0] = 0;
        var cell = document.getElementById('0');
        cell.click();
        chai.assert.deepEqual(gameBoardCopy, gameBoard);
    });

    it('should take message if player win', function () {
        gameBoard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
        var cell = document.getElementById('15');
        cell.click();
        var modal = document.querySelector('.game-victory');
        chai.assert.equal(modal.style.display, 'block');
        modal.style.display = 'none';
    });
});
