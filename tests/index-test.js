describe("15-puzzle", function () {
    before(drawField);

    describe("Render", function () {
        it("should render field with 16 tiles", function () {
            var tiles = document.getElementsByClassName("tile");
            chai.expect(tiles.length).to.be.equal(16);
        });

        it("should first tile attribute textContent equal '0'", function () {
            var lastTile = document.getElementsByClassName("tile")[0];
            chai.expect(lastTile.textContent).to.be.equal("0");
        });

        it("should first tile is hidden", function () {
            var lastTile = document.getElementsByClassName("tile")[0];
            chai.expect(lastTile.style.visibility).to.be.equal("hidden");
        });

        it("should tiles contains all numbers 0-15", function () {
            var tiles = Array.prototype.slice.call(document.getElementsByClassName("tile"));
            var tilesNumbers = tiles
                .map(function (el) {return el.textContent;})
                .sort(function (a, b) {return a - b;});
            var expectedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            chai.expect(tilesNumbers).to.be.deep.equal(expectedNumbers);
        });

        it("should 'win' div is display: none ", function () {
            var win = document.getElementsByClassName("win")[0];
            chai.expect(win.style.display).to.be.deep.equal("none");
        });
    });

    describe("Logic", function () {
        function moveAndCheck(clickTileIndex, emptyIndex) {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[clickTileIndex].textContent;

            tiles[clickTileIndex].click();

            chai.expect(tiles[clickTileIndex].textContent).to.be.deep.equal("0");
            chai.expect(tiles[emptyIndex].textContent).to.be.deep.equal(number);
        }

        function checkNoChanges(clickTileIndex) {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[clickTileIndex].textContent;

            tiles[clickTileIndex].click();

            chai.expect(tiles[clickTileIndex].textContent).to.be.deep.equal(number);
        }

        beforeEach(drawField);

        it("should empty tile move right", function () {
            moveAndCheck(1, 0);
        });

        it("should empty tile move left", function () {
            moveAndCheck(1, 0);
            moveAndCheck(0, 1);
        });

        it("should empty tile move down", function () {
            moveAndCheck(4, 0);
        });

        it("should empty tile move up", function () {
            moveAndCheck(4, 0);
            moveAndCheck(0, 4);
        });

        it("should tile don't move if neighbour visible", function () {
            checkNoChanges(12);
        });

        it("should boundary tiles click", function () {
            var i = 0;
            for (i = 1; i <= 3; moveAndCheck(i, i - 1), i++); // вверхняя стенка
            for (i = 7; i <= 15; moveAndCheck(i, i - 4), i += 4); // правая
            for (i = 15; i >= 13; moveAndCheck(i - 1, i), i--); // нижняя
            for (i = 12; i >= 4; moveAndCheck(i - 4, i), i -= 4); // левая
        });

        it("shouldn't move through the wall left", function () {
            for (var i = 1; i <= 3; moveAndCheck(i, i - 1), i++);
            checkNoChanges(4);
        });

        it("shouldn't move through the wall right", function () {
            moveAndCheck(4, 0);
            checkNoChanges(3);
        });
    });

    describe("Win", function () {
        function setWin(tiles) {
            var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].concat(0);
            for (var i = 0; i < 16; i++) {
                tiles[i].textContent = order[i];
                tiles[i].style.visibility = order[i] ? "visible" : "hidden";
            }
            tiles[0].dispatchEvent(new Event("click"));
        }

        beforeEach(drawField);

        it("should show 'win' div if puzzle completed", function () {
            var tiles = document.getElementsByClassName("tile");
            setWin(tiles);
            var win = document.getElementsByClassName("win")[0];
            chai.expect(win.style.display).to.be.deep.equal("block");
        });

        it("should field background color is lime if win", function () {
            var tiles = document.getElementsByClassName("tile");
            setWin(tiles);
            var field = document.getElementsByClassName("field")[0];
            chai.expect(field.style.backgroundColor).to.be.deep.equal("lime");
        });

        it("should empty tile don't move if win", function () {
            var tiles = document.getElementsByClassName("tile");
            setWin(tiles);
            var number = tiles[14].textContent;
            tiles[14].click();
            chai.expect(tiles[14].textContent).to.be.deep.equal(number);
        });
    });

    describe("Other", function () {
        before(drawField);

        it("special test for return a normal state", function () {
            // пустой тест, который делает возможным играть при заходе на страницу
            // при этом остается возможность просматривать конечные состояния тестов (с after так не получится)
        });
    });
});