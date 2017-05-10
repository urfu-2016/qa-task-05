describe('Игра', function() {
    after(function () {
        startGame();
    });
    it('Должен показывать игровое поле', function () {
        startGame();
        for(var i = 0; i < 4; i++) {
            chai.expect(document.getElementById('pole' + i)).to.exist;
        }
        deleTe();
    });
    it('Перемещает квадратик', function () {
        startGame();
        var but = document.getElementById("but1");
        but.checked = true;
        var pole = move(0,0);
        chai.assert.equal(pole[0][0], 1);
        chai.assert.equal(pole[0][1], 0);
        deleTe();
    });
    it('При попутки переместить квадратик без соседства с пустым, ничего не происходит', function () {
        startGame();
        var but = document.getElementById("but3");
        but.checked = true;
        var pole = move(0,0);
        chai.assert.equal(pole[0][0], 0);
        chai.assert.equal(pole[1][1], 3);
        deleTe();
    });
    it('После конца игры появляется сообщение WIN', function () {
        startGame();
        var but = document.getElementById("but1");
        but.checked = true;
        move(0,0);
        but = document.getElementById("but3");
        but.checked = true;
        move(0,1);
        chai.assert.equal(win(), true);
        deleTe();
    });
});
