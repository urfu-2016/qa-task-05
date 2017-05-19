
describe('Tag', function() {

    it('should change nothing when empty cell is clicked', () =>{
        initGame(document.getElementsByClassName('game')[0]);

        var emptyCell = document.getElementById('empty');
        var prevPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        emptyCell.dispatchEvent(new MouseEvent('click'));

        var currPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        chai.assert.equal(emptyCell.id, 'empty');
    });

    it('should change nothing when cell not near is clicked', () =>{

        initGame(document.getElementsByClassName('game')[0], [1,5,2,3,4,0,6,7,8,9,10,11,12,13,14,15]);

        var cells = document.getElementsByClassName('game')[0].cells;
        
        var emptyCell = cells[1][1];
        var cell = cells[0][2];
        
        cell.dispatchEvent(new MouseEvent('click'));

        chai.assert.equal(cell.id, '');
        chai.assert.equal(cell.innerHTML, '2');
        chai.assert.equal(emptyCell.id, 'empty');
        chai.assert.equal(emptyCell.innerHTML, '');
    });

    it('should change empty cell when a cell nearby is clicked', () =>{

        initGame(document.getElementsByClassName('game')[0], [1,0,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

        var cells = document.getElementsByClassName('game')[0].cells;

        var emptyCell = cells[0][1];
        var cell = cells[0][2];
        
        cell.dispatchEvent(new MouseEvent('click'));

        chai.assert.equal(cell.id, 'empty');
        chai.assert.equal(cell.innerHTML, '');
        chai.assert.equal(emptyCell.id, '');
        chai.assert.equal(emptyCell.innerHTML, 2);
        

        var emptyCell = cells[0][2];
        var cell = cells[0][1];
        
        cell.dispatchEvent(new MouseEvent('click'));

        chai.assert.equal(cell.id, 'empty');
        chai.assert.equal(cell.innerHTML, '');
        chai.assert.equal(emptyCell.id, '');
        chai.assert.equal(emptyCell.innerHTML, 2);
    });

    it('should show player`s winning when right combination is figured out', () =>{

        initGame(document.getElementsByClassName('game')[0], [1,0,2,3,4,5,6,7,8,9,10,11,12,13,14,15])

        var cells = document.getElementsByClassName('game')[0].cells;
        cells[0][0].dispatchEvent(new MouseEvent('click'));
        
        var winningLogo = document.getElementsByClassName('winningLogo')[0];
        chai.expect(winningLogo.className.indexOf('displ') < 0).to.be.true;

        initGame(document.getElementsByClassName('game')[0])
    });

});
