describe('Tag', function() {
    beforeEach(function() {
        startGame();
    })
    after(function() {
        startGame();
    })
    it('should render board with 15 cells', function () {
        var cells = document.getElementsByClassName('cell');
        chai.expect(cells).to.have.lengthOf(15)
    });
    it('should not render cell in first row and in first coll', function () {
        var emptyCell = [].slice.call(document.getElementsByClassName('0-0'));
        chai.expect(emptyCell).to.be.empty;
    });
    it('should contain board with 15 cells and 1-15 numbers', function () {
        var cells = document.getElementsByClassName('text-cell');
        var numbers = [];
        for (var i = 1; i < 16; i++) {
            numbers.push(i);
        }
        var actualNumbers = [];
        for (var i = 0; i < cells.length; i++) {
            actualNumbers.push(+cells[i].textContent);
        }
        actualNumbers.sort(function (a, b) {
            return a - b;
        });
        chai.expect(actualNumbers).to.be.deep.equal(numbers);
    });
    it('should move cell left if clicked on first cell in first row', function () {
        var firstCell = document.getElementsByClassName('0-1')[0];
        firstCell.click();
        chai.expect(firstCell.style.left).to.be.equal('-100px');
    });
    it('should not move not near with empty', function () {
        var cell = document.getElementsByClassName('2-2')[0];
        cell.click();
        chai.expect(cell.style.left).to.be.equal('');
        chai.expect(cell.style.top).to.be.equal('');
    });
    it('should move cell up if clicked on first cell in second row', function () {
        var firstCell = document.getElementsByClassName('1-0')[0];
        firstCell.click();
        chai.expect(firstCell.style.top).to.be.equal('-100px');
    });
    it('should move first cell in second row up and then down', function () {
        var cell = document.getElementsByClassName('1-0')[0];
        cell.click();
        cell.click();
        chai.expect(cell.style.top).to.be.equal('0px');
    });
    it('should move first cell in first row left and then right', function () {
        var cell = document.getElementsByClassName('0-1')[0];
        cell.click();
        cell.click();
        chai.expect(cell.style.left).to.be.equal('0px');
    });
    it('should show modal if all numbers in correct positions and empty cell in last position', function () {
        var board = [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 0],
        ]
        createBoard(board, false);
        if (checkWin(board)) {
            printWin();
        }
        var emptyCell = [].slice.call(document.getElementsByClassName('3-3'));
        chai.expect(emptyCell).to.be.deep.equal([]);
        var modal = document.getElementById('win-modal');
        chai.expect(modal.style.display).not.to.be.equal('none');
    });
    it('should not show modal if not win position', function () {
        var board = [
            [2, 1, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 0],
        ]
        createBoard(board, false);
        if (checkWin(board)) {
            printWin();
        }
        var modal = document.getElementById('win-modal');
        chai.expect(modal.style.display).to.be.equal('none');
    });
});
