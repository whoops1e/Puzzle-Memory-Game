const cards = document.querySelectorAll('.card');
const cardsNum = 20; //Cards number

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

var counter = document.querySelector(".moves"); //Moves counter

var moves = 0; //Completed moves (2 cards flipped)
var pairs = 0; //Completed pairs


var hasFlippedCard = false; 
var firstCard, secoundCard;
var lock = false;


function flipCard() {
    if (lock) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    //console.log(this);
    
    if (hasFlippedCard == false) {
        hasFlippedCard = true;
        firstCard = this;
        //console.log(hasFlippedCard, this);
    } else {
        hasFlippedCard = false;
        secoundCard = this;
        showMoves();
        checkForMatch();
    }
}



function checkForMatch (){
        if (firstCard.dataset.framework == secoundCard.dataset.framework){
            disableCards ();
            pairs++;
            if (pairs === cardsNum/2) {congratulation();}
        } else {        
            flipCardsBack ();
        }
}


function disableCards (){
    firstCard.removeEventListener('click', flipCard);
    secoundCard.removeEventListener('click', flipCard);
    resetBoard();
}


function flipCardsBack (){
    lock = true;
    
    setTimeout(() => {  
    firstCard.classList.remove('flip');
    secoundCard.classList.remove('flip');
        
    resetBoard();
    }, 1500);
}


function showMoves(){
    if (moves === 0) {Clock.start();}
    moves++;
    counter.innerHTML = moves;
}



function resetBoard(){
    hasFlippedCard = false;
    lock = false;
    firstCard = null;
    secoundCard = null;
    console.log("resetBoard");
}


function congratulation (){
    console.log("We have a winner!")
    modal.style.display = "block";
}


function resetGame(){
    console.log("resetGame activated");
    resetBoard();
    moves = 0;
    counter.innerHTML = moves;
    shuffle();
}



var Clock = {
  totalSeconds: 0,
  start: function () {
    var self = this;
		function pad(val) { return val > 9 ? val : "0" + val; }
    this.interval = setInterval(function () {
      self.totalSeconds += 1;

      document.getElementById("minutes").innerHTML = pad(Math.floor(self.totalSeconds / 60 % 60));
      document.getElementById("seconds").innerHTML = pad(parseInt(self.totalSeconds % 60));
    }, 1000);
  },
  
  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  }
};




(function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * cardsNum);
        card.style.order = randomPos;
        console.log("shuffle activated");
    }); 
})();




cards.forEach(card => card.addEventListener('click', flipCard));





// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}







































