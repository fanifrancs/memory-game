const cardArray = [  
    './img/c.png',
    './img/c.png',
    './img/csharp.png',
    './img/csharp.png',
    './img/perl.png',
    './img/perl.png',
    './img/ruby.png',
    './img/ruby.png',
    './img/objc.png',
    './img/objc.png',
    './img/py.png',
    './img/py.png'
]
let grid = document.querySelector('#container');
let sound = document.createElement('audio');
let lis = document.querySelectorAll('li');
let score = lis[1];
let restart = lis[2];
let cardsChosen = [];
let cardsMatched = 0;

//line below rearranges the cards in the array
//works like magic :) 
//I'm still trying to understand how it works lol
cardArray.sort(() => 0.5 - Math.random());

//renders cards to board
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img');
        card.setAttribute('src', './img/unmatched.jpg');
        card.setAttribute('id', i);
        grid.appendChild(card);
        card.addEventListener('click', flip);
    }
}

createBoard();

//flips any clicked card
function flip() {
    let cardId = this.getAttribute('id');
    this.setAttribute('src', cardArray[cardId]);
    if (cardsChosen.length < 2) {
        if (cardsChosen.includes(cardId)) {
            alert('Card is already flipped!');
        } else {
            cardsChosen.push(cardId);
        }
    }
    if (cardsChosen.length === 2) {
        setTimeout(cardsCheck, 100);
    }
}

//checks for match
function cardsCheck() {
    let card1 = document.getElementById(cardsChosen[0]);
    let card2 = document.getElementById(cardsChosen[1]);
    if (card1.getAttribute('src') === card2.getAttribute('src')) {
        card1.setAttribute('src', './img/blank.jpg');
        card2.setAttribute('src', './img/blank.jpg');
        card1.style.pointerEvents = 'none';
        card2.style.pointerEvents = 'none';
        cardsMatched++;
        sound.setAttribute('src', './sounds/tada.mp3');
        sound.play();
        score.innerText = `Pairs matched:${cardsMatched}/6`;
        if (cardsMatched === 6) {
            setTimeout(() => {
                alert('Well done! You found all matching pairs.');
                location.reload();
            }, 1000)
        }
    } else {
        card1.setAttribute('src', './img/unmatched.jpg');
        card2.setAttribute('src', './img/unmatched.jpg');
        sound.setAttribute('src', './sounds/wrong.mp3');
        sound.play();
    }
    cardsChosen = [];
}

restart.addEventListener('click', () => {
    location.reload();
})