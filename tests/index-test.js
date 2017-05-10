var expect = chai.expect;

function getNeighborsIndexes(index) {
    var neighborIndexes = [];
    
    var position = getPosition(index);

    if (position.row < 3) {
        neighborIndexes.push(index + 4);
    }

    if (position.row > 0) {
        neighborIndexes.push(index - 4);
    }
    
    if (position.column > 0) {
        neighborIndexes.push(index - 1);
    }
    
    if (position.column < 3) {
        neighborIndexes.push(index + 1);
    }

    return neighborIndexes;
}

function getNotNeighborsIndex(index) {
    var neighborIndexes = getNeighborsIndexes(index);
    var notNeighborIndex;
    
    for(var i = 0; i < 16; i++) {
        if (neighborIndexes.indexOf(i) === -1 && i !== index) {
            notNeighborIndex = i;
            break;
        } 
    }

    return notNeighborIndex;
}

function getHiddenCellIndex(cells) {
    for(var i = 0; i < cells.length; i++) {
        if (cells[i].style.visibility === 'hidden') {
            return i;
        }
   }

   return -1;
}

function getElements(game, className) {
    return [].filter.call(game.children, function(elem) {
        return elem.classList.contains(className);
    });
}

function getCellPosition(cell) {
    return {
        top: cell.style.top,
        left: cell.style.left
    }
}

function testPosition(actual, expected) {
    expect(actual.top).to.equal(expected.top);
    expect(actual.left).to.equal(expected.left);
}

describe('getNeighborsIndexes', function() {
    it('should return [1, 4] when index is 0', function () {
        var actual = getNeighborsIndexes(0);

        expect(actual).to.include.members([1, 4])
    });
    
    it('should return [0, 2, 5] when index is 1', function () {
        var actual = getNeighborsIndexes(1);

        expect(actual).to.include.members([0, 2, 5])
    });

    it('should return [1, 4, 6, 9] when index is 5', function () {
        var actual = getNeighborsIndexes(5);

        expect(actual).to.include.members([1, 4, 6, 9])
    });
    
});  

describe('Game', function() {
    var event = new Event('click', {bubbles: true});
    var cells;
    
    beforeEach(function () {
        var game = document.getElementById('game');
        init();
        cells = getElements(game, 'cell');
    });
    
    after(function () {
        init();
    });

    context('Initialization', function () {
        it('should create 16 cells', function () {
            expect(cells).to.have.lengthOf(16);
        });
        
        it('should create 15 visibable cells', function () {
            var visibleCells = cells.filter(function(cell) {
                return cell.style.visibility === '';
            });

            expect(visibleCells).to.have.lengthOf(15);
        });
        
        it('should create 1 hidden cell in position (1%, 1%)', function () {
            var hiddenCells = cells.filter(function(cell) {
                return cell.style.visibility === 'hidden';
            });

            expect(hiddenCells).to.have.lengthOf(1);
            testPosition(hiddenCells[0].style, {top: '1%', left: '1%'});
        });
    });

    context('Move', function () {
        var indexOfhiddenCell;

        beforeEach(function () {
            indexOfhiddenCell = getHiddenCellIndex(cells);
        });

        it('shouldn\'t move cells when click on empty cell', function () {
            var positions = cells.map(getCellPosition);
            cells[indexOfhiddenCell].dispatchEvent(event);

            for (var i = 0; i < cells.length; i++) {
                testPosition(cells[i].style, positions[i])
            }
        });

        it('should move cell when click on neighbore of empty cell', function () {
            var neighborIndex = getNeighborsIndexes(indexOfhiddenCell)[0];

            var neighboreCellProperties = getCellPosition(cells[neighborIndex]);
            var hiddenCellProperties = getCellPosition(cells[indexOfhiddenCell]);

            cells[neighborIndex].dispatchEvent(event);

            testPosition(cells[indexOfhiddenCell].style, neighboreCellProperties);
            testPosition(cells[neighborIndex].style, hiddenCellProperties)
        });

        it('shouldn\'t move cells when click on not neighbors of empty cell', function () {
            var notNeighborIndex = getNotNeighborsIndex(indexOfhiddenCell);

            var positions = cells.map(getCellPosition);
            cells[notNeighborIndex].dispatchEvent(event);

            for (var i = 0; i < cells.length; i++) {
                testPosition(cells[i].style, positions[i])
            }
        });
    });

    context('Win', function () {
        it('should show win message', function () {
            var winCombination = [16, 1, 2, 3, 5, 6, 7, 4, 9, 10, 11, 8, 13, 14, 15, 12];
            combination = winCombination;
            
            winMessages = getElements(game, 'win-message');
            expect(winMessages).to.have.lengthOf(0);
            
            [1, 2, 3, 7, 11, 15].forEach(function(i) {
                cells[i].dispatchEvent(event);
            });
            
            winMessages = getElements(game, 'win-message');
            expect(winMessages).to.have.lengthOf(1);
        });
    });
});
