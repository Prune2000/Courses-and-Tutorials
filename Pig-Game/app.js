/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 20 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, scoreToWin;

function setScore(){
    document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.ask-score').style.display = 'block';

    document.getElementById('btn-input').addEventListener('click', function() {
        scoreToWin = document.getElementById('score-input').value;
        init();
    });
}

setScore();


function init() {
    scores = [0 , 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = 0;

    document.querySelector('.btn-new').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    document.querySelector('.ask-score').style.display = 'none';


    document.querySelector('.dice').style.display = 'none'; // hides the dice before the game starts

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active'); // Reassign the active class to the first player
}

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // if activePlayer is 0 then move it to 1 or else move it back to 0
    roundScore = 0;
    previousDice = 0;

    //Reset the current score back to 0 when rolling a 1
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Move the active class to the next player playing
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //toggle will find if the class is there and remove it, or if it's not there and add it
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //Hide the dice when a 1 is rolled
    diceDOM.style.display = 'none';
}

// Start the game when the page loads
// init();

//Event when clicking "Roll the dice"
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        //1. Random dice
        var dice = Math.floor(Math.random() * 6) + 1;
        //var dice = 6; //just here to test the double 6 rule

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score IF the rolled was NOT a 1 or a double 6
        if (previousDice === 6 && dice === previousDice) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            nextPlayer();

        } else if (dice !== 1) {
            //Add score
            roundScore += dice; //roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            previousDice = dice;
            
        } else {
            nextPlayer();
        }
    }   
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= scoreToWin) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
            document.querySelector('.dice').style.display = 'none';
        

            // Change the display of the player panel to make it into the CSS category of the winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        nextPlayer();
        }
    }
})

// New game function
document.querySelector('.btn-new').addEventListener('click', setScore);





//dice = Math.floor(Math.random() * 6) + 1; // floor gives a number without decimal, random gives a number from 0 to 1

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-1').textContent;


































