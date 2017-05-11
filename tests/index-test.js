chai.should();


describe('Tag', function() {
    beforeEach(newGame);

    it('check the format of the cells', function () {
        document.getElementById('board').childElementCount.should.be.equal(16);

        for (var i = 1; i < 16; i++) {
            var currentcell = document.getElementById('board').childNodes[i];
            currentcell.innerHTML.should.be.equal(CURRENT_PLAY[i].toString());
            currentcell.className.should.be.contains('cell');
        }
    });

    it('must draw cell movement', function () {
        var indexEmpty = CURRENT_PLAY.indexOf(0);
        var empty = document.getElementById('board').childNodes[indexEmpty];
        try {
            var notEmpty = document.getElementById('board').childNodes[indexEmpty+1];
            notEmpty.click();
        }
        catch (err) {
            var notEmpty = document.getElementById('board').childNodes[indexEmpty-1];
            notEmpty.click();
        } finally {
            notEmpty.innerHTML.should.be.equal(CURRENT_PLAY[indexEmpty].toString());
        }
    });

    it('should not draw a "Победа!"', function () {
        document.getElementById('board').childNodes[2].click();
        var victory = document.getElementById('victory');
        victory.innerText.should.be.not.equal('Победа!');
    });

    it('should draw "Победа!" when game victory', function () {
        document.getElementById('board').innerHTML = '';
        CURRENT_PLAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
        draw();
        document.getElementById('board').childNodes[15].click();

        var victory = document.getElementById('victory');
        victory.innerText.should.be.equal('Победа!');

        newGame();
    })
});