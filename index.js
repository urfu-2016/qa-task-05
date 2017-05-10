function init()
{
    var canvas = document.getElementById('spots');
    canvas.width  = 440;
    canvas.height = 440;
    var cellSize = canvas.width / 4;
    var context = canvas.getContext('2d');
    var field = new SpotsGame();
    field.mix(500);
    field.setCellView(function(x, y)
    {
        context.fillStyle = '#b6d4ff';
        context.fillRect(x+1, y+1, cellSize-2, cellSize-2);
    });
    field.setNumView(function()
    {
        context.font = (cellSize/2)+'px Sans';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#3a43b4';
    });
    context.fillStyle = '#d7eef6';
    context.fillRect(0, 0, canvas.width, canvas.height);
    field.draw(context, cellSize);
    function event(x, y)
    {
        field.move(x, y);
        context.fillStyle = '#d7eef6';
        context.fillRect(0, 0, canvas.width, canvas.height);
        field.draw(context, cellSize);
        field.victory();
    }
    canvas.onclick = function(e)
    {
        var x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
        var y = (e.pageY - canvas.offsetTop)  / cellSize | 0;
        event(x, y);
    };
}


function SpotsGame()
{
    var cellView = null;
    var numView = null;
    var arr = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15]];

    function getNullPos()
    {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (arr[j][i] === 0)
                    return {'x':i,'y':j};
    }

    function getRandomBool()
    {
        return Math.random() >= 0.5;
    }

    this.move = function(x, y)
    {
        var nullX = getNullPos().x;
        var nullY = getNullPos().y;
        if (((x - 1 === nullX || x + 1 === nullX) && y === nullY)
            || ((y - 1 === nullY || y + 1 === nullY) && x === nullX))
        {
            arr[nullY][nullX] = arr[y][x];
            arr[y][x] = 0;
        }
    };

    this.victory = function()
    {
        var victory = document.getElementById('victoryMessage');
        var victoryArr = [
            [1,2,3,4],
            [5,6,7,8],
            [9,10,11,12],
            [13,14,15,0]];
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (victoryArr[i][j] !== arr[i][j])
                {
                    victory.style.visibility = 'hidden';
                    return false;
                }
        victory.style.visibility = 'visible';
        return true;
    };

    this.mix = function(stepCount)
    {
        var x,y;
        for (var i = 0; i < stepCount; i++)
        {
            var nullX = getNullPos().x;
            var nullY = getNullPos().y;
            var horizontal = getRandomBool();
            var upOrLeft = getRandomBool();
            if (!horizontal && !upOrLeft) { x = nullX; y = nullY + 1; }
            if (horizontal && !upOrLeft)  { x = nullX + 1; y = nullY; }
            if (!horizontal && upOrLeft)  { x = nullX; y = nullY - 1; }
            if (horizontal && upOrLeft)   { x = nullX - 1; y = nullY; }
            if (0 <= x && x <= 3 && 0 <= y && y <= 3)
                this.move(x, y);
        }
        arr[getNullPos().y][getNullPos().x] = arr[0][0];
        arr[0][0] = 0;
    };

    this.setCellView = function(func)
    {
        cellView = func;
    };

    this.setNumView = function(func)
    {
        numView = func;
    };

    this.draw = function(context, size)
    {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                if (arr[i][j] !== 0)
                {
                    if (cellView !== null)
                        cellView(j * size, i * size);
                    if (numView !== null)
                    {
                        numView();
                        context.fillText(
                            arr[i][j],
                            j * size + size / 2,
                            i * size + size / 2);
                    }
                }
    };

    this.getArray = function ()
    {
        return arr;
    };

    this.setArray = function (array)
    {
        arr = array;
    };
}