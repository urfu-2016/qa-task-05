describe('specks game test', function() {

    function resetState() {
        var specks = document.querySelector('.specks');
        while (specks.firstChild) {
            specks.removeChild(specks.firstChild);
        }
        app.init();
    }

    beforeEach(function() {
        resetState();
    });

    after(function() {
        resetState();
    });

    it('should generate 15 specks block', function() {
        var specksBlocks = document.querySelectorAll('.specks__item');
        var countBlock = 0;
        [].forEach.call(specksBlocks, function(item) {
            if (item.innerHTML !== '') countBlock += 1
        })
        chai.assert.equal(countBlock, 15);
    });

    it('should generate 1 specks hidden block', function() {
        var specksItemNone = document.querySelector('.specks__item--hidden');
        chai.assert.isDefined(specksItemNone, 'invisible block is defined');
    });

    it('should generate 15 specks block with value from 1 to 15', function() {
        var specksBlocks = document.querySelectorAll('.specks__item');
        var actual = [];
        [].forEach.call(specksBlocks, function(item) {
            if (item.innerHTML !== '' && +item.innerHTML < 16 && +item.innerHTML > 0 && actual.indexOf(+item.innerHTML) === -1)
                actual.push(+item.innerHTML)
        })

        chai.assert.lengthOf(actual, 15, 'array is contained 15 blocks with value from 1 to 15');
    });

    it('should finish game when combination is [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]', function() {
        var specksBlocks = document.querySelectorAll('.specks__item');
        [].forEach.call(specksBlocks, function(item) {
            if (item.innerHTML !== '') {
                if (+item.innerHTML < 5) {
                    item.style.gridColumn = +item.innerHTML;
                    item.style.gridRow = 1;
                }

                if (+item.innerHTML > 4 && +item.innerHTML < 9) {
                    item.style.gridRow = 2;
                    item.style.gridColumn = +item.innerHTML - 4;
                }

                if (+item.innerHTML > 8 && +item.innerHTML < 13) {
                    item.style.gridRow = 3;
                    item.style.gridColumn = +item.innerHTML - 8;
                }

                if (+item.innerHTML > 12 && +item.innerHTML < 16) {
                    item.style.gridRow = 4;
                    item.style.gridColumn= +item.innerHTML - 12;
                }
            } else {
                item.style.gridColumn = 4
                item.style.gridRow = 4
            }
        })

        specksBlocks[1].click();
        var blockWin = document.querySelector('.specks__game-stop');
        chai.assert.isDefined(blockWin, 'block win is defined');

    });

    describe('check move blocks', function() {
        function checkMove(isShouldMove) {
            var specksBlocks = document.querySelectorAll('.specks__item');
            var specksItemNone = document.querySelector('.specks__item--hidden');
            var colEl2 = +specksItemNone.style.gridColumn[0];
            var rowEl2 = +specksItemNone.style.gridRow[0];
            var newColEl1, newRowEl1;
            for (var i = 1; i < specksBlocks.length; i++) {
                var colEl1 = +specksBlocks[i].style.gridColumn[0];
                var rowEl1 = +specksBlocks[i].style.gridRow[0];
                var flag = ((Math.abs(colEl1 - colEl2) === 1 && Math.abs(rowEl1 - rowEl2) === 0)
                || (Math.abs(colEl1 - colEl2) === 0 && Math.abs(rowEl1 - rowEl2) === 1));
                flag = isShouldMove ? flag : !flag;
                if (flag) {
                    specksBlocks[i].click();
                    valueEl = specksBlocks[i].innerHTML;
                    newColEl1 = +specksBlocks[i].style.gridColumn[0];
                    newRowEl1 = +specksBlocks[i].style.gridRow[0];
                    break;  
                }
            }
            if (isShouldMove) {
                chai.assert.equal(colEl2, newColEl1);
                chai.assert.equal(rowEl2, newRowEl1);
                chai.assert.equal(+specksItemNone.style.gridColumn[0], colEl1);
                chai.assert.equal(+specksItemNone.style.gridRow[0], rowEl1);
            } else {
                chai.assert.equal(colEl1, newColEl1);
                chai.assert.equal(rowEl1, newRowEl1);
                chai.assert.equal(+specksItemNone.style.gridColumn[0], colEl2);
                chai.assert.equal(+specksItemNone.style.gridRow[0], rowEl2);
            }
        }

        it('should move block after click', function() {
            checkMove(true);
        });

        it('should not move block after click', function() {
            checkMove(false);
        });
        
    })
});
