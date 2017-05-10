function isWin(tiles) {
    return !tiles.some(function (item, i) {
        return item.textContent > 0 && item.textContent - 1 !== i;
    });
}

function swapTiles(tile, emptyTile) {
    var temp = tile.textContent;
    tile.textContent = emptyTile.textContent;
    tile.style.visibility = "hidden";

    emptyTile.textContent = temp;
    emptyTile.style.visibility = "visible";
}


function onTileClick(event) {
    var clickedTile = event.target;
    var tiles = Array.prototype.slice.call(document.getElementsByClassName("tile"));

    var index = tiles.map(function (el) {return el.textContent;}).indexOf(clickedTile.textContent);
    if (index + 4 < 16 && tiles[index + 4].textContent === "0") swapTiles(clickedTile, tiles[index + 4]);
    if (index + 1 < 16 && tiles[index + 1].textContent === "0") swapTiles(clickedTile, tiles[index + 1]);
    if (index - 4 > 0 && tiles[index - 4].textContent === "0") swapTiles(clickedTile, tiles[index - 4]);
    if (index - 1 > 0 && tiles[index - 1].textContent === "0") swapTiles(clickedTile, tiles[index - 1]);

    if (isWin(tiles)) {
        document.getElementsByClassName("win")[0].style.display = "block";
        document.getElementsByClassName("field")[0].style.backgroundColor = "lime";
        tiles.forEach(function (tile) {
            tile.removeEventListener("click", onTileClick);
        });
    }
}

function drawField() {
    var field = document.getElementsByClassName("field")[0];
    while (field.firstChild) {
        field.removeChild(field.firstChild);
    }
    document.getElementsByClassName("win")[0].style.display = "none";
    document.getElementsByClassName("field")[0].style.backgroundColor = "#FBFBFB";

    var order = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].sort(function () {return Math.random() - .5;}).concat(0);
    for (var i = 0; i < 16; i++) {
        var tile = document.createElement("div");
        tile.classList.add("tile");
        tile.addEventListener("click", onTileClick);
        if (!order[i]) tile.style.visibility = "hidden";
        tile.textContent = order[i];
        field.appendChild(tile);
    }
}

drawField();