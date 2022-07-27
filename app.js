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
let score = document.querySelector('span');
let restart = document.querySelectorAll('li')[2];
let cardsChosen = [];
let cardsMatched = 0;

//line below rearranges the images in the array
//works like magic :) 
//still tryin to understand how it works : )
//if you do please kindly get in touch : )
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
async function flip() {
    if (cardsChosen.length < 2) {
        let cardId = this.getAttribute('id');
        this.setAttribute('src', cardArray[cardId]);
        if (cardsChosen.includes(cardId)) {
            sound.setAttribute('src', './sounds/wrong.mp3');
            await sound.play();
            alert('Card is already flipped!');
        } else {
            cardsChosen.push(cardId);
        }
    }
    if (cardsChosen.length === 2) {
        setTimeout(cardsCheck, 800);
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
        score.innerText = cardsMatched;
        if (cardsMatched === 6) {
            setTimeout(() => {
                alert('WELL DONE ! You found all matching pairs.');
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