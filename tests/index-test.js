
describe('Tag', function() {

    beforeEach(() => {
        initGame(document.getElementsByClassName('game')[0]);
    });

    it('should change nothing when empty cell is clicked', () =>{
        var emptyCell = document.getElementById('empty');
        var prevPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        emptyCell.dispatchEvent(new MouseEvent('click'));

        var currPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        chai.assert.equal(emptyCell.id, 'empty');
    });

    it('should change nothing when cell not near is clicked', () =>{
        var cells = document.getElementsByClassName('game')[0].cells;
        var emptyCell = document.getElementById('empty');
        var eCellPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        
        for (var i = 0; i < 4; i++){
            for (var j = 0; j < 4; j++){
                if ((i == eCellPos.x && (Math.abs(eCellPos.y - j) < 2)) || 
                    (j == eCellPos.y && (Math.abs(eCellPos.x - i) < 2)))
                    continue;
                var cell = cells[i][j];
                var prevPos = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y')) };
                cell.dispatchEvent(new MouseEvent('click'));

                var currPos = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y')) };

                chai.assert.equal(cell.id, '');
                chai.assert.equal(emptyCell.id, 'empty')
            }
        }
    });

    it('should change empty cell when a cell nearby is clicked', () =>{
        var cells = document.getElementsByClassName('game')[0].cells;
        var emptyCell = document.getElementById('empty');
        var eCellPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };

        var dX = eCellPos.x > 0 ? -1 : 1;

        var cell = cells[eCellPos.x + dX][eCellPos.y];
        cellVal = cell.innerHTML;
        cell.dispatchEvent(new MouseEvent('click'));

        chai.assert.equal(cell.id, 'empty');
        chai.assert.equal(cell.innerHTML, '');
        chai.assert.equal(emptyCell.id, '');
        chai.assert.equal(emptyCell.innerHTML, cellVal);
        

        var emptyCell = document.getElementById('empty');
        var eCellPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        var cell = cells[eCellPos.x - dX][eCellPos.y];
        cell.dispatchEvent(new MouseEvent('click'));

        chai.assert.equal(cell.id, 'empty');
        chai.assert.equal(cell.innerHTML, '');
        chai.assert.equal(emptyCell.id, '');
        chai.assert.equal(emptyCell.innerHTML, cellVal);
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
