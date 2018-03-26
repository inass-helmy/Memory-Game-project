
 // Create a list that holds all of deck's cards
 
let card = document.querySelectorAll(".card");
let cardList = [...card];
let shuffledCards;
let deck = document.querySelector(".deck");
// counter for the user clicks
let moves = document.querySelector(".moves");
let count;
var time;
finalMoves = document.querySelector(".finalMoves");

//time counter

let timer = document.querySelector(".timer");
let finalTime = document.querySelector(".finalTime");

//restart button
const restart = document.querySelector(".restart");

//rating starts
let firstStar = document.querySelector("#firstStar");
let secondStar = document.querySelector("#secondStar");
let thirdStar = document.querySelector("#thirdStar");
let starRate = document.querySelector("#starRate");
let stars = document.querySelector(".stars")
//the congratulation message
let congrats = document.querySelector(".congMessage");

//the play agian and thanks buttons
let playAgain = document.querySelector(".play-btn");
let thanks = document.querySelector(".thanks-btn");

// create a list for the opened cards
let openedList = deck.querySelectorAll(".open");

//array to hold the matched cards
let matchCards = deck.querySelectorAll(".match");

document.onload = startGame();

//@Description to start the game 
function startGame() {
    // add the new shuffled cards to the deck
    shuffledCards = shuffle(cardList);
    setGame();

    for (let i = 0; i < shuffledCards.length; i++) {
        [].forEach.call(shuffledCards, function(elem) {
            deck.append(elem);
        });

        // display and check if a two cards was clicked matched or not
        shuffledCards[i].addEventListener("click", function display() {
        	displayMove();
            this.classList.add("open");
            this.classList.add("show");
            this.classList.add("no-click");

            // displayMove(this);
            if (this.classList.contains("match") === false) {

                checkMatch(shuffledCards[i]);
            }
        });
    }

    //handling the restart button
    restart.addEventListener("click", function(evt) {
        var message = confirm("Are you sure?");
        if (message) {
            setGame();
        }
    });
}

function setGame() {
    
    congrats.style.display = "none";
    timer.textContent = "00:00";
    clearInterval(time);
    setTimer();
    count = 0;
     moves.innerHTML = count;
     openedList = [];
    thirdStar.style.display = "initial";
    secondStar.style.display = "initial";
    for (let i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].classList.remove("show", "open", "match", "no-click");
    }
}


//@Description to check the two cards match or not and disable all other cards
function checkMatch(openedCard) {
openedList = deck.querySelectorAll(".open");
    if (openedList.length === 2) {
        for (var i = 0; i < shuffledCards.length; i++) {
            shuffledCards[i].classList.add("no-click");
        }
        if (openedList[0].type === openedList[1].type) {
            matchedCards();
                gameEnd();


        } else {

            unmatchedCards();
        }
    }
}

//  if the two cards was matched then disable any action on them and enable the rest of the cards
function matchedCards() {
    openedList[0].classList.add("match");
    openedList[1].classList.add("match");
    openedList[0].classList.remove("open", "show");
    openedList[1].classList.remove("open", "show");
    for (var i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].classList.remove("no-click");
    }
   matchCards = deck.querySelectorAll(".match");

}
//  if the two cards are unmatched flip the cards and set a delay for 0.7s 
function unmatchedCards() {

    openedList[0].classList.add("unmatch");
    openedList[1].classList.add("unmatch");
    setTimeout(function() {
        openedList[0].classList.remove("show", "open", "unmatch");
        openedList[1].classList.remove("show", "open", "unmatch");
        for (var i = 0; i < shuffledCards.length; i++) {
            shuffledCards[i].classList.remove("no-click");
        }

    }, 700);

}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

//@Description to count the moves of the users and displays it on screen
function displayMove() {
        count++;
        moves.innerHTML = count;
    if (count > 30 && count <= 40) {
        thirdStar.style.display = "none";
    }
    if (count > 40) {
        secondStar.style.display = "none";

    }
}

//@Description to set the timer and display it on the screen
function setTimer() {
    let secUnits = 0;
let secTenth = 0;
let minUnits = 0;
let minTenth = 0;
    time = setInterval(function() {
        if(openedList.length>=1){
        	secUnits++
        	if(secUnits>9) {
        	secUnits = 0;
        		secTenth++;
        		if (secUnits === 0 && secTenth === 6) {
            secUnits = 0;
    		secTenth = 0;
            minUnits++;
            if(minUnits>9) {
        	minUnits = 0;
        		minTenth++;
        		minUnits++;
        	}
        	}

        

        }
		timer.textContent = minTenth + minUnits + ":" + secTenth + secUnits;

        }
        
    }, 1000);
}

//@Description to print out a congratulatinos message depending on the final rate and time
function gameEnd() {
    if (matchCards.length === 2) {
        finalTime.textContent = timer.innerHTML;
        finalMoves.innerHTML = count;
        clearInterval(time);

        congrats.style.display = "initial";
        var finalStars = document.querySelector(".stars").innerHTML;
        starRate.innerHTML = finalStars;

        playAgain.addEventListener("click", function() {
 		shuffledCards = shuffle(cardList);

    setGame();
        });

        thanks.addEventListener("click", function() {
            congrats.style.display = "none";
            moves.innerHTML = 0;
            timer.textContent = "00:00";

            for (var i = 0; i < shuffledCards.length; i++) {
            shuffledCards[i].classList.add("no-click");
            shuffledCards[i].classList.remove("show","open","match");
        }
        });

    }

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