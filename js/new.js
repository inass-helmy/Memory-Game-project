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
const sec = document.querySelector(".sec");
const min = document.querySelector(".min");
let finalTime = document.querySelector(".finalTime");
