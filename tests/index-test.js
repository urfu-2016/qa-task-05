describe('Tag', function()
{
    beforeEach(function ()
    {
        var victoryMessage = document.getElementById('victoryMessage');
        victoryMessage.style.visibility = 'hidden';
    });

    it('Should create a field for the game.', function ()
    {
        var array = [
            [0,1,2,3],
            [4,5,6,7],
            [8,9,10,11],
            [12,13,14,15]];
        var spots = new SpotsGame();
        var spotsArr = spots.getArray();
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                chai.expect(spotsArr[i][j] === array[i][j])
    });
	
	it('Should report victory.', function ()
    {
        var arr = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15]];
        var spots = new SpotsGame();
        var victoryMessage = document.getElementById('victoryMessage');
        spots.setArray(arr);
        spots.victory();
        chai.expect(victoryMessage.style.visibility).to.equal('hidden');
        arr = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,15,0]];
        spots.setArray(arr);
        spots.victory();
        chai.expect(victoryMessage.style.visibility).to.equal('visible');
    });
	
	it('Should move the cell, which is the neighbor of an empty cell.', function ()
    {
		var spots = new SpotsGame();
		var arr = spots.getArray();
        chai.expect(arr[0][0]).to.equal(0);
        var number = arr[1][0];
		spots.move(0, 1);
        chai.expect(arr[0][0]).to.equal(number);
        chai.expect(arr[1][0]).to.equal(0);
    });

    it('Should not move the cell, which is not a neighbor of an empty cell.', function ()
    {
        var spots = new SpotsGame();
        var arr = spots.getArray();
        chai.expect(arr[0][0]).to.equal(0);
        var number = arr[2][2];
        spots.move(2, 2);
        chai.expect(arr[0][0]).to.equal(0);
        chai.expect(arr[2][2]).to.equal(number);
    });

    it('Should not move the empty cell.', function ()
    {
        var spots = new SpotsGame();
        var arr = spots.getArray();
        chai.expect(arr[0][0]).to.equal(0);
        spots.move(0, 0);
        chai.expect(arr[0][0]).to.equal(0);
    });
});
