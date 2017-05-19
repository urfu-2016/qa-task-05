var ARRAY = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15]];

function init()
{
    document.getElementById('board').innerHTML = '';
    ARRAY = mix(500);
}

function move(x, y)
{
    var nullX = getNullPos().x;
    var nullY = getNullPos().y;
    if (((x - 1 === nullX || x + 1 === nullX) && y === nullY)
        || ((y - 1 === nullY || y + 1 === nullY) && x === nullX))
    {
        ARRAY[nullY][nullX] = ARRAY[y][x];
        ARRAY[y][x] = 0;
        document.getElementById('board').innerHTML = '';
        draw();
    }
}

function victory()
{
    var victory = document.getElementById('victoryMessage');
    var victoryArr = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,0]];
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (victoryArr[i][j] !== ARRAY[i][j])
            {
                victory.style.visibility = 'hidden';
                return
            }
    victory.style.visibility = 'visible';
}

function draw()
{
    var drawCell = document.getElementById('board');
    ARRAY.forEach(function (row, y)
    {
        row.forEach(function (elem, x)
        {
            var cell = document.createElement('div');
            cell.innerHTML = elem + '';
            cell.className = elem ? 'cell' : 'cell empty';
            if (elem)
            {
                cell.onclick = move.bind(this, x, y);
                victory();
            }
            drawCell.appendChild(cell);
        });
    });
}

function getNullPos()
{
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (ARRAY[j][i] === 0)
                return {'x':i,'y':j};
}

function getRandomBool()
{
    return Math.random() >= 0.5;
}

function mix(stepCount)
{
    var x,y;
    for (var i = 0; i < stepCount; i++)
    {
        var nullX = getNullPos().x;
        var nullY = getNullPos().y;
        var horizontal = 0;
        if (getRandomBool())
            horizontal = 1;
        var downOrRight = 0;
        if (getRandomBool())
            downOrRight = 2;
        x = nullX + horizontal * (downOrRight - 1);
        y = nullY + (horizontal ^ 1) * (downOrRight - 1);
        if (0 <= x && x <= 3 && 0 <= y && y <= 3)
            this.move(x, y);
    }
    ARRAY[getNullPos().y][getNullPos().x] = ARRAY[0][0];
    ARRAY[0][0] = 0;
    document.getElementById('board').innerHTML = '';
    draw();
    return ARRAY
}

init();
