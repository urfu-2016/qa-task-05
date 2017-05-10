describe("15-puzzle", function () {
    describe("Render", function () {
        it("should render field with 16 tiles", function () {
            var tiles = document.getElementsByClassName("tile");
            chai.expect(tiles.length).to.be.equal(16);
        });

        it("should last tile attribute textContent equal '0'", function () {
            var lastTile = document.getElementsByClassName("tile")[15];
            chai.expect(lastTile.textContent).to.be.equal("0");
        });

        it("should last tile is hidden", function () {
            var lastTile = document.getElementsByClassName("tile")[15];
            chai.expect(lastTile.style.visibility).to.be.equal("hidden");
        });

        it("should tiles contains all numbers 0-15", function () {
            var tiles = Array.prototype.slice.call(document.getElementsByClassName("tile"));
            var tilesNumbers = tiles.map(function (el) {
                return el.textContent;
            }).sort(function (a, b) {
                return a - b;
            });
            var expectNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
            chai.expect(tilesNumbers).to.be.deep.equal(expectNumbers);
        });

        it("should 'win' div is display: none ", function () {
            var win = document.getElementsByClassName("win")[0];
            chai.expect(win.style.display).to.be.deep.equal("none");
        });
    });

    describe("Logic", function () {
        afterEach(function () {
            drawField();
        });

        it("should empty tile move left", function () {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[14].textContent;
            tiles[14].click();
            chai.expect(tiles[14].textContent).to.be.deep.equal("0");
            chai.expect(tiles[15].textContent).to.be.deep.equal(number);
        });

        it("should empty tile move right", function () {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[14].textContent;
            tiles[14].click();
            tiles[15].click();
            chai.expect(tiles[14].textContent).to.be.deep.equal(number);
            chai.expect(tiles[15].textContent).to.be.deep.equal("0");
        });

        it("should empty tile move up", function () {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[11].textContent;
            tiles[11].click();
            chai.expect(tiles[11].textContent).to.be.deep.equal("0");
            chai.expect(tiles[15].textContent).to.be.deep.equal(number);
        });

        it("should empty tile move down", function () {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[11].textContent;
            tiles[11].click();
            tiles[15].click();
            chai.expect(tiles[11].textContent).to.be.deep.equal(number);
            chai.expect(tiles[15].textContent).to.be.deep.equal("0");
        });

        it("should tile don't move if neighbour visible", function () {
            var tiles = document.getElementsByClassName("tile");
            var number = tiles[0].textContent;
            tiles[0].click();
            chai.expect(tiles[0].textContent).to.be.deep.equal(number);
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

        afterEach(function () {
            drawField();
        });

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
});