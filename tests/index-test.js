describe('Tag', function()
{
    beforeEach(function ()
    {
        ARRAY = [
            [1,2,3,4],
            [5,0,6,7],
            [8,9,10,11],
            [12,13,14,15]];
        var victoryMessage = document.getElementById('victoryMessage');
        victoryMessage.style.visibility = 'hidden';
    });
    after(function ()
    {
        init();
    });


    it('Should create a field for the game.', function ()
    {
        var cells = [].slice.call(document.getElementsByClassName('cell'));

        for (var i = 1; i <= 16; i++)
            chai.expect(document.getElementById('' + i)).to.be.not.an('undefined');
    });

    it('Should report victory.', function ()
    {
        var victoryMessage = document.getElementById('victoryMessage');
        chai.expect(victoryMessage.style.visibility).to.equal('hidden');
        document.getElementById('board').innerHTML = '';
        ARRAY = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,0,15]];
        draw();
        document.getElementById('board').childNodes[15].click();
        chai.expect(victoryMessage.style.visibility).to.equal('visible');
    });

    it('Should move the cell, which is the neighbor of the empty cell from the right.', function ()
    {
        var neighbor = document.getElementById('board').childNodes[6];
        neighbor.click();
        chai.expect('0').to.equal(ARRAY[1][2].toString());
    });

    it('Should move the cell, which is the neighbor of the empty cell from the top.', function ()
    {
        var neighbor = document.getElementById('board').childNodes[1];
        neighbor.click();
        chai.expect('0').to.equal(ARRAY[0][1].toString());
    });

    it('Should move the cell, which is the neighbor of the empty cell from the bottom.', function ()
    {
        var neighbor = document.getElementById('board').childNodes[9];
        neighbor.click();
        chai.expect('0').to.equal(ARRAY[2][1].toString());
    });

    it('Should move the cell, which is the neighbor of the empty cell from the left.', function ()
    {
        var neighbor = document.getElementById('board').childNodes[4];
        neighbor.click();
        chai.expect('0').to.equal(ARRAY[1][0].toString());
    });

    it('Should correctly move the cells after applying a sequence of clicks.', function ()
    {
        document.getElementById('board').childNodes[6].click();
        chai.expect('0').to.equal(ARRAY[1][2].toString());
        document.getElementById('board').childNodes[7].click();
        chai.expect('0').to.equal(ARRAY[1][3].toString());
        document.getElementById('board').childNodes[11].click();
        chai.expect('0').to.equal(ARRAY[2][3].toString());
        document.getElementById('board').childNodes[10].click();
        chai.expect('0').to.equal(ARRAY[2][2].toString());
        document.getElementById('board').childNodes[6].click();
        chai.expect('0').to.equal(ARRAY[1][2].toString());
    });

    it('Should not move the cell, which is not a neighbor of an empty cell.', function ()
    {
        var notNeighbor = document.getElementById('board').childNodes[7];
        notNeighbor.click();
        chai.expect('0').to.equal(ARRAY[1][1].toString());
    });

    it('Should not move the empty cell.', function ()
    {
        var emptyCell = document.getElementById('board').childNodes[5];
        emptyCell.click();
        chai.expect('0').to.equal(ARRAY[1][1].toString());
    });
});
