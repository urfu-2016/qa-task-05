describe('specks game test', function() {

    afterEach(function() {
        var specks = document.querySelector('.specks');
        while (specks.firstChild) {
            specks.removeChild(specks.firstChild);
        }
        app.init();
    })

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

});
