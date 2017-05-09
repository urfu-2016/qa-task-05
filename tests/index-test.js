describe('Tag', function() {

    it('should change nothing when empty cell is clicked', () =>{
        var emptyCell = document.getElementById('empty');
        var prevPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        emptyCell.dispatchEvent(new MouseEvent('click'));

        var currPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        chai.assert.equal(emptyCell.id, 'empty');
        chai.assert.equal(currPos.x, prevPos.x);
        chai.assert.equal(currPos.y, prevPos.y);
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
                chai.assert.equal(currPos.x, prevPos.x);
                chai.assert.equal(currPos.y, prevPos.y);
            }
        }
    });

    it('should change empty cell when a cell nearby is clicked', () =>{
        var cells = document.getElementsByClassName('game')[0].cells;
        var emptyCell = document.getElementById('empty');
        var eCellPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };

        var dX = eCellPos.x > 0 ? -1 : 1;

        var prevCoords = { x: eCellPos.x, y : eCellPos.y };
        var cell = cells[eCellPos.x + dX][eCellPos.y];
        cell.dispatchEvent(new MouseEvent('click'));
        var currCoords = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y')) };

        chai.assert.equal(cell.id, 'empty');
        chai.assert.equal(currCoords.x, prevCoords.x + dX);
        chai.assert.equal(currCoords.y, prevCoords.y);
        

        var emptyCell = document.getElementById('empty');
        var eCellPos = { x: parseInt(emptyCell.getAttribute('x')), y: parseInt(emptyCell.getAttribute('y')) };
        var prevCoords = currCoords;
        console.log(currCoords, prevCoords);
        var cell = cells[eCellPos.x - dX][eCellPos.y];
        cell.dispatchEvent(new MouseEvent('click'));
        var currCoords = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y')) };
        console.log(currCoords, prevCoords);

        chai.assert.equal(cell.id, 'empty');
        chai.assert.equal(currCoords.x, prevCoords.x - dX);
        chai.assert.equal(currCoords.y, prevCoords.y);

    });

});
