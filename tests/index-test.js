describe('Игра', function() {
    after(function () {
        startGame();
    });
    it('Должен показывать игровое поле', function () {
        startGame();
        for(var i = 0; i < SIZE*SIZE; i++) {
            chai.expect(document.getElementById('pole' + i)).to.exist;
        }
        deleTe();
    });
    it('При попутки переместить квадратик без соседства с пустым, ничего не происходит', function () {
        startGame();
        var a = POLE[0][0];
        move(0,0);
        chai.assert.equal(POLE[0][0], a);
        deleTe();
    });
    it('Перемещает квадратик', function () {
        startGame();
        var a = POLE[3][2];
        move(2, 3);
        chai.assert.equal(POLE[3][3], a);
        chai.assert.equal(POLE[3][2], 0);
        deleTe();
    });

});
