
//to return the list of objects in with card class
const cards = document.querySelectorAll('.card');
console.log(cards);


/* click event lister to trigger cards, set conditions to start clock, update move count
and stars. All functions used have been defined below */

const deck = document.querySelector('.deck');
  deck.addEventListener('click', event => {
    const clickTarget = event.target;

        if (clickTarget.classList.contains('card') && toggledCards.length < 2 && !toggledCards.includes(clickTarget)) {
            if(clockOff === true) {
                startClock();
                clockOff = false;
            }
            toggleCard(clickTarget); 
            addToggleCard(clickTarget);
            if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
        }
    } 
    }); 


function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
} 

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    // console.log(toggledCards);
} 

let matched = 0;
const TOTAL_PAIRS = 8;

//function to check for matched cards, conditions to finish game, also to clear cards that dont match
function checkForMatch() {
    if (toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) {
            toggledCards[0].classList.toggle('match');
            toggledCards[1].classList.toggle('match');            
         
            matched++;
            console.log(matched);
            toggledCards = [];
            if (matched === TOTAL_PAIRS) {
                gameOver();
            }
        }else{
            setTimeout(() => {
                if (toggledCards.length >1) {

                toggledCards[0].classList.remove('open','show');
                toggledCards[1].classList.remove('open','show');
                }

                toggledCards = [];
        }, 1000);
    }   
}


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


//Shuffle Cards
function shuffleDeck() {
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
} 
shuffleDeck(); 

// Number of moves
let moves = 0; 
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
} 

// Stars
function hideStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
} 

hideStar();

//function to hide star at an amount of moves
function checkScore() {
    if (moves === 16 || moves === 24) {
        hideStar();
    }
} 

// start clock function 
let time = 0;
let clockId; 

function startClock() { 
        clockId = setInterval(() => {
            displayTime()
        time++;  
    }, 1000);
}

// stop clock function
function stopClock() {
    clearInterval(clockId);
} 

// clock display function 
function displayTime() {
    const clock = document.querySelector('.clock');
    // console.log(clock);
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    // setting conditions for seconds count
    if(seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    }else{
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// Toggle modal on and off
function toggleModal() {
    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('hide');
} 

toggleModal(); //to open modal
toggleModal(); //to close modal


// time = 121;
displayTime();
moves = 16;
checkScore();


// results showcase after finishing game play
function writeModalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();
    
    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if(star.style.display !== 'none') {
            starCount++;
        }
    } 
    // console.log(starCount);
    return starCount;
}

// setting event listener for the replay and cancel 
document.querySelector('.button_cancel').addEventListener('click', () => {
    toggleModal();
});

document.querySelector('.button_replay').addEventListener('click', replayGame);

/* defining functions for reset clock, reset moves and reset stars
to be used in the 'reset game' function*/

function resetClock(){
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
} 

function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
} 

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
} 

// the function to reset game play
function resetGame() {
    resetClock();
    resetMoves();
    resetStars();
    shuffleDeck();
    matched = 0;
    toggledCards = [];

    for (let i = 0; i<cards.length; i++) {
    cards[i].classList.remove('open', 'show', 'match');
    }
}

// calling the reset game function and adding click event
resetGame();
    document.querySelector('.restart').addEventListener('click', resetGame);
    document.querySelector('.button_replay').addEventListener('click', resetGame);


function gameOver() {
    stopClock();
    writeModalStats();
    toggleModal();
} 

function replayGame() {
    resetGame();
    toggleModal();
} 

document.querySelector('.button_replay').addEventListener('click', replayGame);

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for(let card of cards) {
        card.className = 'card';
    }
}

