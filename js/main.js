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
    
    if (hasFlippedCard == false) {
        hasFlippedCard = true;
        firstCard = this;
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
    setTimeout(() => {  
        firstCard.classList.add('match');
        secoundCard.classList.add('match');
    }, 750);
    
    firstCard.removeEventListener('click', flipCard);
    secoundCard.removeEventListener('click', flipCard);
    setTimeout(() => {  
    resetBoard();
    }, 1000);
}


function flipCardsBack (){
    lock = true;
    setTimeout(() => {  
        firstCard.classList.add('unmatch');
        secoundCard.classList.add('unmatch');
    }, 750);
    
    setTimeout(() => {  
        firstCard.classList.remove('unmatch');
        secoundCard.classList.remove('unmatch');
        firstCard.classList.remove('flip');
        secoundCard.classList.remove('flip');
    }, 1400);
    
    setTimeout(() => {  
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



//CONGRATULATION modal
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








































