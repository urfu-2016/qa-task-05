describe('Game tests', function () {
    before(function () {
        $.fx.off = true;
    });

    after(function () {
        $.fx.off = false;
        game._initField();
    });

    beforeEach(function () {
        game._initField();
    });

    it('should init field', function () {
        var rows = [].slice.call(document.getElementsByClassName('js-game-field')[0].children);

        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        var numbersCheck = [];

        var counter = rows.reduce(function (counter, item) {
            counter += item.children.length;

            var elems = [].slice.call(item.children);

            elems.forEach(function (item) {
                var num = parseInt(item.textContent, 10);
                numbersCheck.push(num);
            });

            return counter;
        }, 0);

        chai.assert.deepEqual(numbers, numbersCheck.sort(function (a, b) {
            return a - b;
        }));
        chai.assert.equal(counter, 16);
    });

    it('should move cell', function (done) {
        var cell = document.getElementsByClassName('js-cell')[1];

        cell.click();

        setTimeout(function () {
            var cellAfterClick = document.getElementsByClassName('js-cell')[1];

            chai.assert.isTrue(cellAfterClick.classList.contains('js-space'));

            done();
        }, 500);
    });

    it('should don`t move cell', function (done) {
        var cell = document.getElementsByClassName('js-cell')[2];

        cell.click();

        setTimeout(function () {
            var cellAfterClick = document.getElementsByClassName('js-cell')[2];

            chai.assert.equal(cell, cellAfterClick);

            done();
        }, 500);
    });

    it('should execute win action after move cell', function () {
        game._initField(true);
        game._checkWin();

        var wonBlock = document.getElementsByClassName('js-won')[0];

        chai.assert.isTrue(wonBlock.classList.contains('trigger'));
    });
});
