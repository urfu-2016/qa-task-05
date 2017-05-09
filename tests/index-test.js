describe('Game tests', function () {
    it('should init field', function () {
        var rows = [].slice.call(document.getElementsByClassName('js-game-field')[0].children);

        var counter = rows.reduce(function (counter, item) {
            counter.elems ? counter.elems += item.children.length : counter.elems = item.children.length;

            var elems = [].slice.call(item.children);

            elems.forEach(function (item) {
                counter.sum ? counter.sum += parseInt(item.textContent, 10) : counter.sum = parseInt(item.textContent, 10);
            });

            return counter;
        }, {});

        chai.assert.equal(counter.elems, 16);
        chai.assert.equal(counter.sum, 120);
    });

    it('should move cell', function () {

    });

    it('should execute win action after move cell', function () {

    });
});
