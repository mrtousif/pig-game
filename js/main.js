let scores, roundScore, activePlayer, dice, gameState;

const diceDOM = document.querySelector('.dice')
// document.querySelector('#current' + activePlayer).textContent = dice

function resetGame() {
  scores = [0, 0]
  roundScore = 0
  activePlayer = 0
  gameState = true;

  diceDOM.style.display = 'none'
  document.querySelector('#current-0').textContent = '0'
  document.querySelector('#current-1').textContent = '0'
  document.querySelector('#score-0').textContent = '0'
  document.querySelector('#score-1').textContent = '0'
  document.querySelector('#name-0').textContent = 'PLAYER 1'
  document.querySelector('#name-1').textContent = 'PLAYER 2'

  document.querySelector('.player-1-panel').classList.remove('active', 'winner')
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
}

document.addEventListener('DOMContentLoaded', resetGame)
// Reset when New Game triggerd 
document.querySelector('.btn-new').addEventListener('click', resetGame)

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gameState) {
      
    // Set up dice with random number
    let dice = Math.floor((Math.random() * 6) + 1)
    // Display the dice
    diceDOM.style.display = 'block'
    // Displaying respective dice image
    diceDOM.src = './images/dice-' + dice + '.png'

    // Update the round score if the rolled number was not 1
    if (dice !== 1) {
      roundScore += dice
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else { // dice == 1
      switchPlayer()
    }
  }
  
})


document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gameState) {

    // Set the score
    scores[activePlayer] += roundScore
    // Display the score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    // Check if player won the game
    if (scores[activePlayer] > 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner'
      diceDOM.style.display = 'none'
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      // make all inactive unless new game
      gameState = false
    } else {
      // Switching active player
      switchPlayer()
    }
  }
})

function switchPlayer() {
  // Reset round score
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = '0';
  // Switching active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // Hide the dice
  diceDOM.style.display = 'none';
}