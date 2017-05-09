describe('Tag', function()
{
    beforeEach(function ()
    {
        var victoryMessage = document.getElementById('victoryMessage');
        victoryMessage.style.visibility = 'hidden';
    })

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
        spots.victoryWithArray(arr);
        chai.expect(victoryMessage.style.visibility).to.equal('hidden');
        arr = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,15,0]];
        spots.victoryWithArray(arr);
        chai.expect(victoryMessage.style.visibility).to.equal('visible');
        victoryMessage.style.visibility = 'hidden';
    });
});
