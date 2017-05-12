'use strict';

chai.should();

describe('Tag', function() {
    it('should show 16 tiles', function () {
        let tiles = document.getElementsByClassName('tile');
        tiles.should.have.length(16);
    });

    it('should move tile, which has empty near', function () {
        let hole = game.field.indexOf(0);
        let elemPosition = hole - 4 >= 0 ? hole - 4 : hole + 4;
        chai.expect(game.move(game.field[elemPosition])).to.be.true;
    });

    it('should not move tile, which has not empty near', function () {
        let hole = game.field.indexOf(0);
        let elemPosition = hole - 5 >= 0 ? hole - 5 : hole + 5;
        chai.expect(game.move(game.field[elemPosition])).to.be.false;
        drawer.rePaint();
    });

    it('should be victory when all tiles in right order', function () {
        let game = new Game();
        chai.expect(game.isVictory()).to.be.true;
    });
});
