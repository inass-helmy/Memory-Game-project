/*
 * Create a list that holds all of your cards
 */
let card = document.querySelectorAll(".card");
let cardList = [...card];
let shuffledCards = shuffle(cardList);
let deck = document.querySelector(".deck");
// counter for the user clicks
let moves = document.querySelector(".moves");
let count = 0;
var time;
//time counter
const sec = document.querySelector(".sec");
const min = document.querySelector(".min");

//restart button
const restart = document.querySelector(".restart");

//rating starts
let	firstStar = document.querySelector("#firstStar");
let	secondStar = document.querySelector("#secondStar");
let	thirdStar = document.querySelector("#thirdStar");



// create a list for the opened cards
var openedList = [];
//array to hold the matched cards
let matchCards = [];

document.onload = startGame();

function startGame() {

	 clearInterval(time);
	 setTimer();
	// add the new shuffled cards to the deck
for (let i = 0; i<shuffledCards.length; i++){
 [].forEach.call(shuffledCards, function(elem){
deck.append(elem);
 });

 // display and check if a two cards was clicked matched or not
 	shuffledCards[i].addEventListener("click", function display(){
	
    this.classList.add("open");
     let openedCard = this.classList.add("show");
     this.classList.add("no-click");
     displayMove(this);
      if(this.classList.contains("match")===false){

     checkMatch(shuffledCards[i]) ;
 }
    	});
 }
 
restart.addEventListener("click", function(){
var message = confirm("Are you sure?");
if (message) {
    clearInterval(time);
	 setTimer();
	 count=0;
	 moves.innerHTML = count;
	 thirdStar.style.display = "initial";
 	secondStar.style.display = "initial";
for (let i = 0; i<shuffledCards.length; i++){
	 shuffledCards[i].classList.remove("show", "open","match","no-click");

}
}
 });
}


	// function to check the two cards match or not and disable all other cards
function checkMatch(openedCard){
	
	openedList.push(openedCard);
	if(openedList.length === 2){
		for (var i = 1; i<shuffledCards.length; i++)
		{
			shuffledCards[i].classList.add("no-click");
		}
		if(openedList[0].type === openedList[1].type){
			matchedCards();

		}
		else {

			unmatchedCards();
		}
	}
}

//  if the two cards was matched then disable any action on them and enable the rest of the cards
function matchedCards() {
openedList[0].classList.add("match", "no-click");
openedList[1].classList.add("match", "no-click");
for (var i = 1; i<shuffledCards.length; i++)
		{
			shuffledCards[i].classList.remove("no-click");
		}
matchCards.push(openedList);
openedList = [];

}
//  if the two cards are unmatched flip the cards and set a delay for 0.7s 
function unmatchedCards() {
	
openedList[0].classList.add("unmatch");
openedList[1].classList.add("unmatch");
setTimeout(function(){
openedList[0].classList.remove("show", "open", "unmatch", "no-click");
openedList[1].classList.remove("show", "open", "unmatch", "no-click");
openedList = [];
for (var i = 1; i<shuffledCards.length; i++)
		{
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
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayMove(card) {
if(card.classList.contains("no-click")) {
	count++;
	moves.innerHTML = count;

}
if (count > 30 && count <=40) {
	thirdStar.style.display = "none";
}
if (count > 40) {
	secondStar.style.display = "none";

}
}
function setTimer() {
	let seconds = 0;
let minutes = 0;
	time = setInterval(function(){
sec.innerHTML = seconds;
seconds++
if(seconds === 60){
	minutes++
	seconds = 0;
	min.innerHTML = minutes;
}
	},1000);
}
// function gameEnd()


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
