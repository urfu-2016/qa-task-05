// Логику пятнашек нужно описать в этом файле

var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var field = getFieldElements();
var cells = _.flatten(field);
var freeCell;

init();

function getFieldElements() {
	var field = [];
	
	for (var i = 0; i < 4; i++) {
		field[i] = [];
		for (var j = 0; j < 4; j++) {
			field[i][j] = document.querySelector('.cell-'+i+'-'+j);
		}		
	}
	
	return field;
}

function init() {
	initField(getRandomField());
	setEventHandlers();
}

function initField(values) {
	var initialCells = cells.slice(1);
	
	for (var i = 0; i < values.length; i++) {
		initialCells[i].textContent = values[i];
		initialCells[i].classList.remove('free');
	}
	
	freeCell = cells[0];
	freeCell.textContent = '';
	freeCell.classList.add('free');
}

function setEventHandlers() {
	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', onCellClick);
	}
}

function onCellClick(event) {
	var cell = event.target;
	
	if (isNeighbour(cell, freeCell)) {
		freeCell.textContent = cell.textContent;
		cell.textContent = '';
		freeCell.classList.remove('free');
		cell.classList.add('free');
		
		freeCell = cell;
		
		if (isWin()) {
			document.querySelector('.table').classList.add('win');
		} else {
			document.querySelector('.table').classList.remove('win');		
		}
	}
}

function isWin() {
	return cells.slice(0, -1).every(function (cell, index) {
		return Number.parseInt(cell.textContent) === values[index];
	});
}

function isNeighbour(cell1, cell2) {
	var cellInfo1 = cell1.dataset;
	var cellInfo2 = cell2.dataset;
	var rowDifference = Math.abs(cellInfo1.row - cellInfo2.row);
	var columnDifference = Math.abs(cellInfo1.column - cellInfo2.column);
	
	return (rowDifference === 1 && columnDifference === 0) || 
		(rowDifference === 0 && columnDifference === 1);
}

function getRandomField() {
	return _.shuffle(values);
}
