/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var cardsArray = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
//var cardsContainer = document.querySelector(".deck");
let shuffleCards = shuffle(cardsArray);
loadCards(shuffleCards);

function loadCards(shuffleCards) {
    let cardsShuffled = "";
    for (i = 0; i < shuffleCards.length; i++) {
        cardsShuffled = cardsShuffled + `<li class='card'><i class='${shuffleCards[i]}'></i></li>`
    }
    document.querySelector('.deck').innerHTML = cardsShuffled;
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
cards = document.querySelectorAll('li.card')
let flippedCards = [];
window.onload = flipCards();
//clicking on cards and flipping them
function flipCards() {
    let cardsShuffled = shuffle(cardsArray);
    cards.forEach(function (card) {
        if (flippedCards.length != 2) {
            card.addEventListener('click', function () {
                card.classList.add('open', 'show', 'disabled');
                flippedCards.push(card)
                if (flippedCards.length === 2) {
                    compareCards(flippedCards)
                }
            })
        }
    })
}
let score = 0;

function compareCards() {
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        flippedCards[0].classList.add('match');
        flippedCards[1].classList.add('match');
        //reset the flippedcards array
        flippedCards = [];
        //calculate the score
        score++
        if (score == 8) {
            victory()
        }
    } else if (flippedCards[0].innerHTML != flippedCards[1].innerHTML) {
        //give the player sometime to view the cards before hiding them again and resetting the arrray
        setTimeout(function () {
            flippedCards = [];
            document.querySelectorAll('li.open').forEach(function (opened) {
                opened.classList.remove('open', 'show', 'disabled');
            })
            removeStar();
        }, 200);
    }
    addMove()
}
var totalMoves = 1;
//increase number of player moves
function addMove() {
    moves = document.querySelector('span.moves')
    moves.innerHTML = totalMoves++;
}
var totalStars = document.querySelector('.stars');
var star = '<li><i class="fa fa-star"></i></li>';
var starScore ='';
function removeStar() {
    if (totalMoves >= 13) {
        totalStars.innerHTML = star;
        starScore = 1;
    } else if (totalMoves >= 10 && totalMoves <= 12) {
        totalStars.innerHTML = star + star;
        starScore = 2
    } else {
        totalStars.innerHTML = star + star + star;
        starScore = 3
    }
}
//call countdown function
var counterInterval = window.setInterval(function () {
    gameTime()
}, 1000);
var countDown = 60;

function gameTime() {
    var time = document.querySelector('span.timer')
    if (countDown != 0) {
        time.innerHTML = countDown-- + 's';
    } else {
        //game over and stop timer
        clearInterval(counterInterval)
        gameOver();
    }
}
//stop time, calculate moves, display victory message
function victory() {
    clearInterval(counterInterval)
    totalMoves = totalMoves - 1;
    setTimeout(function () {
        alert('Congratulations you beat the game! You did it in ' + totalMoves + ' moves \n Your time was:' + countDown + '\n Number of stars: ' + starScore)
    }, 100);
}
// display game over message
function gameOver() {
    var endGame = confirm('Game Over! Time is up. Your score was: ' + score)
    if (endGame) {
        restartGame();
    }
}

function restartGame() {
    location.reload()
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */