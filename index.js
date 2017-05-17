var game = (function () {
  function shuffleState (array) {
    var arr = array.slice()
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return [0].concat(arr)
  }

  function startGame (state) {
    $container.innerHTML = ''
    state.forEach( function (i) {
      var element = document.createElement('div')
      element.className = 'element'
      element.dataset.val = i
      element.innerHTML = i
      $container.appendChild(element)
    })
  }

  function getElements () {
    return Array.prototype.slice.call($container.children)
  }

  function checkVictory () {
    var $nodes = getElements()
    var isWin = true

    for (var i = 0; i < $nodes.length; i++) {
      if ($nodes[i].dataset.val != wonState[i]) {
        isWin = false
        break
      }
    }

    if (isWin) {
      alert('Победа! Следущая игра начнется автоматически')
      restartGame()
    }
  }

  function swapElements ($el) {
    var $nodes = getElements()
    var elIndex = $nodes.indexOf($el)
    var $blank = $container.querySelector('[data-val="0"]')
    var blankIndex = $nodes.indexOf($blank)

    if ([elIndex + 1, elIndex - 1, elIndex + 4, elIndex - 4].includes(blankIndex)) {
      var $clonedEl = $el.cloneNode(true)
      var $clonedBlank = $blank.cloneNode(true)

      $blank.parentNode.replaceChild($clonedEl, $blank)
      $el.parentNode.replaceChild($clonedBlank, $el)

      checkVictory()
    }
  }

  function restartGame () {
    startGame(shuffleState(digits))
  }

  var $container = document.getElementById('puzzle')
  var $restartButton = document.getElementById('restart')
  var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  var wonState = digits.concat([0])
  startGame(shuffleState(digits))

  $container.onclick = function (e) {
    swapElements(e.target)
  }

  $restartButton.onclick = function (e) {
    restartGame()
  }

  return {
    start: startGame,
  }
}())
