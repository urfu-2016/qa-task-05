var assert = chai.assert;

describe('Puzzle box tests', function() {

    beforeEach(function() {
        var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
        removeChildren(puzzleBox);
    });

    it('should generate puzzleBox with 15 divs with class "space" ', function() {
        setOnRandomPositions();
        var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
        var spacesInBox = puzzleBox.childNodes;

        assert.lengthOf(spacesInBox, 15);
        for (var i = 0; i < spacesInBox.length; i++) {
            assert.equal(spacesInBox[i].classList.contains('space'), true);
            assert.equal(spacesInBox[i].tagName, 'DIV');
        }
    });

    it('victory should be achievable', function() {
        setOnSimplePositions();
        var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
        var space15 = puzzleBox.childNodes[11];
        var space12 = puzzleBox.childNodes[10];
        var space11 = puzzleBox.childNodes[14];
        space15.click();
        space12.click();
        space11.click();
        space15.click();

        var victoryScreen = document.getElementsByClassName('victory-screen')[0];
        var computedStyle = getComputedStyle(victoryScreen);
        var displayValue = computedStyle.display;
        assert.equal(displayValue, 'block');

        victoryScreen.style.cssText = 'display: none';
    });

    it('impossible move shouldnt be executed', function() {
        setOnRandomPositions();
        var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
        var spaceToMove = puzzleBox.childNodes[0];
        var spaceNum = parseInt(spaceToMove.innerHTML);
        var spacePosition = spacesCurrPositions.indexOf(spaceNum);

        spaceToMove.click();
        var spacePositionAfterMove = spacesCurrPositions.indexOf(spaceNum);
        assert.equal(spacePosition, spacePositionAfterMove);
    });

    it('space should move 1step bottom', function() {
        setOnRandomPositions();
        var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
        var spaceToMove = puzzleBox.childNodes[11];
        var spaceNum = parseInt(spaceToMove.innerHTML);
        var spacePosition = spacesCurrPositions.indexOf(spaceNum);
        console.log(spacesCurrPositions);

        spaceToMove.click();
        console.log(spacesCurrPositions);
        var spacePositionAfterMove = spacesCurrPositions.indexOf(spaceNum);
        console.log(spacePositionAfterMove);
        assert.equal(spacePosition + 4, spacePositionAfterMove);
    });

    it('space should move 1step right', function() {
        setOnRandomPositions();
        var puzzleBox = document.getElementsByClassName('puzzle-box')[0];
        var spaceToMove = puzzleBox.childNodes[14];
        var spaceNum = parseInt(spaceToMove.innerHTML);
        var spacePosition = spacesCurrPositions.indexOf(spaceNum);
        console.log(spacesCurrPositions);

        spaceToMove.click();
        console.log(spacesCurrPositions);
        var spacePositionAfterMove = spacesCurrPositions.indexOf(spaceNum);
        console.log(spacePositionAfterMove);
        assert.equal(spacePosition + 1, spacePositionAfterMove);
        spaceToMove.click();
    });

});



