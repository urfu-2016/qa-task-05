describe('Tag', function()
{
    beforeEach(function ()
    {
        ARRAY = [
            [0,1,2,3],
            [4,5,6,7],
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

	it('Should move the cell, which is the neighbor of an empty cell.', function ()
    {
        var neighbor = document.getElementById('board').childNodes[1];
        neighbor.click();
        chai.expect('0').to.equal(ARRAY[0][1].toString());
        neighbor = document.getElementById('board').childNodes[5];
        neighbor.click();
        chai.expect('0').to.equal(ARRAY[1][1].toString());
    });

    it('Should not move the cell, which is not a neighbor of an empty cell.', function ()
    {
        var notNeighbor = document.getElementById('board').childNodes[7];
        notNeighbor.click();
        chai.expect('0').to.equal(ARRAY[0][0].toString());
    });

    it('Should not move the empty cell.', function ()
    {
        var emptyCell = document.getElementById('board').childNodes[0];
        emptyCell.click();
        chai.expect('0').to.equal(ARRAY[0][0].toString());
    });
});
