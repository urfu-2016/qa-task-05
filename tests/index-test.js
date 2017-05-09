var assert = chai.assert

describe('Puzzle', function () {
  after( function () {
    game.restart()
    window.alert.restore()
  })

  it('Runs new game onload', function () {
    $elements = game.getElements()
    assert.lengthOf($elements, 16)
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
      $elements = game.getElements()
    });

    it('Blank with adjacent horizontal element', function () {
      var blank = $elements[0]
      var first = $elements[1]

      assert.equal(blank.dataset.val, '0')
      first.click()

      $elements = game.getElements()

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

      $elements = game.getElements()

      four = $elements.find( function (el) { return el.dataset.val == '4' })
      blank = $elements.find( function (el) { return el.dataset.val == '0' })

      assert.equal($elements.indexOf(blank), 4)
      assert.equal($elements.indexOf(four), 0)
    });

    it('Nothing if there were no adjacent blank element', function () {
      $elements[10].click()

      var notChanged = true
      $elements = game.getElements()
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
    var spy = sinon.stub(window, 'alert')
    var state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]
    game.start(state)
    game.getElements()[$elements.length - 1].click()

    assert(spy.calledOnce)
    assert.equal(spy.args[0][0], 'Победа! Следущая игра начнется автоматически')
  })
})
