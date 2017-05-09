function getTestElements() {
	var field = getFieldElements();
	var cells = _.flatten(field);

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
	
	return {
		field: field,
		cells: cells
	};
}

var testElements = getTestElements();

describe('Game', function () {
	describe('Initialization', function() {
		it('should be free cell for .cell-0-0', function() {
			var cell = document.querySelector('.cell-0-0');
			
			checkFree(cell);
		});
		
		it('should be uniq values in range from 1 to 15', function() {
			var values = [];
			
			testElements.cells.slice(1).forEach(function (cell) {
				var number = Number.parseInt(cell.textContent);
				
				chai.expect(number >= 1 && number <= 15).to.be.true;
				values.push(number);
			});
			
			chai.expect(_.uniq(values).length).to.equal(15);
		});
	});

	describe('Gameplay', function() {
		beforeEach(function() {
			initField(getRandomField());
		});

		it('should move cell if it is in neighbour row of free cell', function() {
			var freeCell = document.querySelector('.cell-0-0');
			var cell = document.querySelector('.cell-1-0');
			var content = cell.textContent;
			
			cell.click();
			checkFree(cell);
			checkActive(freeCell, content);
		});

		it('should move cell if it is in neighbour column of free cell', function() {
			var freeCell = document.querySelector('.cell-0-0');
			var cell = document.querySelector('.cell-0-1');
			var content = cell.textContent;
			
			cell.click();
			checkFree(cell);
			checkActive(freeCell, content);
		});
		
		it('should not move cell if it is not neighbour of free cell', function() {
			var freeCell = document.querySelector('.cell-0-0');
			var cell = document.querySelector('.cell-3-2');
			var content = cell.textContent;
			
			cell.click();
			checkFree(freeCell);
			checkActive(cell, content);
		});
	});

	describe('Win', function() {	
		beforeEach(function() {
			initField([2, 3, 4, 1, 6, 7, 8, 5, 10, 11, 12, 9, 13, 14, 15]);
		});
		
		it('should be win if numbers are in right order', function() {
			win();
			
			chai.expect(document.querySelector('.table').classList.contains('win')).to.be.true;
		});
		
		it('should not be win if cell moves after win', function() {
			win();
			
			document.querySelector('.cell-3-2').click();
			
			chai.expect(document.querySelector('.table').classList.contains('win')).to.be.false;
		});
		
		function win() {
			document.querySelector('.cell-1-0').click();
			document.querySelector('.cell-2-0').click();
			document.querySelector('.cell-3-0').click();
			document.querySelector('.cell-3-1').click();
			document.querySelector('.cell-3-2').click();
			document.querySelector('.cell-3-3').click();
		}
	});
	
	after(function () {
		//Чтобы можно было играть после тестов (по-хорошему надо две версии - с тестами и без)
		initField(getRandomField());	
	});

	function checkActive(cell, content) {
		chai.expect(cell.textContent).to.equal(content);
		chai.expect(cell.classList.contains('free')).to.be.false;
	}

	function checkFree(cell) {
		chai.expect(cell.textContent).to.equal('');
		chai.expect(cell.classList.contains('free')).to.be.true;
	}

});
