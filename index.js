
initGame(document.getElementsByClassName('game')[0]);

function initGame(divToInsert, valuesArr) {

    var logo = document.getElementsByClassName('winningLogo')[0];
    if (logo.className.indexOf(' displ') < 0)
        document.getElementsByClassName('winningLogo')[0].className += ' displ';

    var cells = [];
    var sections = [];
    var values = [];
    for (var i = 1; i < 16; i++)
        values[i-1] = i;

    for (var i = 0; i < 4; i++){
        cells[i] = [];
        var section = document.createElement('section');
        sections.push(section);
        for (var j = 0; j < 4; j++){
            var div = document.createElement('div');
            div.setAttribute('x', i);
            div.setAttribute('y', j);
            div.addEventListener("click", function() { tryToMove(this)});
            if (i === 0 && j === 0 && valuesArr == undefined){
                div.setAttribute('id', 'empty');
                cells[i][j] = div;
                section.appendChild(div);
                continue;    
            }
            if (valuesArr == undefined){
                var ind = Math.round(Math.random()*(values.length-1));
                var currValue = values.splice(ind, 1);
            }
            else
            { 
                var currValue = valuesArr.shift()
                if (currValue == 0){
                    div.setAttribute('id', 'empty');
                    cells[i][j] = div;
                    section.appendChild(div);
                    continue;
                }

            }
            div.innerHTML = currValue;
            section.appendChild(div);
            cells[i][j] = div;
        }
    }
    divToInsert.innerHTML = '';
    for (var i = 0; i < sections.length; i++){
        divToInsert.appendChild(sections[i]);
        divToInsert.cells = cells;
    }
}


function tryToMove(cell){

    var cellCoords = { x: parseInt(cell.getAttribute('x')) , y: parseInt(cell.getAttribute('y'))};
    var cells = document.getElementsByClassName('game')[0].cells;
    var coords = [ {x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1} ];
    for (var i = 0; i < coords.length; i++){
        p = coords[i];
        var newCoords = { x: cellCoords.x + p.x, y: cellCoords.y + p.y };
        if (newCoords.x < 0 || newCoords.x > 3 || newCoords.y < 0 || newCoords.y > 3)
            continue;
        var cellToCheck = cells[newCoords.x][newCoords.y];
        if (cellToCheck.innerHTML.length === 0){
            cellToCheck.setAttribute('id', '');
            cellToCheck.innerHTML = cell.innerHTML;
            cell.setAttribute('id', 'empty');
            cell.innerHTML = '';
            break;
        }
    }

    if (checkWin(cells)){
        var logo = document.getElementsByClassName('winningLogo')[0];
        var index = logo.className.indexOf(' displ');
        logo.className = logo.className.slice(0, index);
    }
}

function checkWin(cells){
    var emptyCell = document.getElementById('empty');
    var eCellX = parseInt(emptyCell.getAttribute('x'));
    var eCellY = parseInt(emptyCell.getAttribute('y'));

    if  ((eCellX != 0 && eCellX != 3) || (eCellY != 0 && eCellY != 3))
        return false;

    var directions = [ {x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1} ];
    var startPosFound = false;
    var mainDir;
    var currentPos;
    for (var i = 0; i < directions.length; i++){
        var dir = directions[i];
         if (eCellX + dir.x < 0 || eCellX + dir.x > 3 || eCellY + dir.y < 0 || eCellY + dir.y > 3)
            continue;
        if (cells[eCellX + dir.x][eCellY + dir.y].innerHTML == 1){
            mainDir = dir;
            currentPos = {x: eCellX + dir.x, y: eCellY + dir.y}
            startPosFound = true;
        }
    }

    if (!startPosFound)
        return false;
    var counter = 1;
    while (counter < 16){
        if (parseInt(cells[currentPos.x][currentPos.y].innerHTML) != counter){
            return false;
        }

        var nextPos = { x: currentPos.x + mainDir.x, y: currentPos.y + mainDir.y }
        if (nextPos.x < 0 || nextPos.x > 3){
            nextPos.x = 4-Math.abs(nextPos.x);
            if (eCellY == 0)
                nextPos.y++;
            else 
                nextPos.y--;
        }
        if (nextPos.y < 0 || nextPos.y > 3){
            nextPos.y = 4-Math.abs(nextPos.y);
            if (eCellX == 0)
                nextPos.x++;
            else
                nextPos.x--;
        }
        currentPos = nextPos;
        
        counter++;
    }
    return true;

}
