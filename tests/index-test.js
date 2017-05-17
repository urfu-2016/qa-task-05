var assert = chai.assert

var $container = document.getElementById('puzzle')
var $restart = document.getElementById('restart')

function restart(argument) {
  $restart.click()
}

function getElements () {
  return Array.prototype.slice.call($container.children)
}


describe('Puzzle', function () {
  var spy

  before( function() {
    spy = sinon.stub(window, 'alert')
  })

  after( function () {
    restart()
    window.alert.restore()
  })

  it('Runs new game onload', function () {
    var $elements = getElements()

    var state = $elements.map( function (el) {
      return parseInt(el.dataset.val, 10)
    })

    var orig = []
    for (var i = 0; i <= 15; i++) {
      orig.push(i)
    }

    assert.lengthOf($elements, 16)
    assert.equal(state.sort().join(','), orig.sort().join(','))
    $elements.forEach(function (el) {
      assert.equal(el.classList, 'element')
      assert.equal(el.tagName, 'DIV')
      assert.equal(el.dataset.val, el.textContent)
    })
  });

  describe('Swaps', function () {
    var $elements, state

    beforeEach(function () {
      state = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14]
      game.start(state)
      $elements = getElements()
    });

    it('Blank with adjacent horizontal element', function () {
      var blank = $elements[0]
      var first = $elements[1]

      assert.equal(blank.dataset.val, '0')
      first.click()

      $elements = getElements()

      first = $elements.find( function (el) { return el.dataset.val == '1' })
      blank = $elements.find( function (el) { return el.dataset.val == '0' })

      assert.equal($elements.indexOf(blank), 1)
      assert.equal($elements.indexOf(first), 0)
    });

    it('Blank with adjacent vertical element', function () {
      var blank = $elements[0]
      var four = $elements[4]

      assert.equal(blank.dataset.val, '0')
      four.click()

      $elements = getElements()

      four = $elements.find( function (el) { return el.dataset.val == '4' })
      blank = $elements.find( function (el) { return el.dataset.val == '0' })

      assert.equal($elements.indexOf(blank), 4)
      assert.equal($elements.indexOf(four), 0)
    });

    it('Nothing if there were no adjacent blank element', function () {
      $elements[10].click()

      var notChanged = true
      $elements = getElements()
      for (var i = 0; i < $elements.length; i++) {
        if ($elements[i].dataset.val != state[i]) {
          notChanged = false
          break
        }
      }

      assert(notChanged)
    })
  })

  it('Shows alert on win', function () {
    var state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]
    game.start(state)
    var $elements = getElements()
    $elements[$elements.length - 1].click()

    assert(spy.calledOnce)
    assert.equal(spy.args[0][0], 'Победа! Следущая игра начнется автоматически')
  })
})
