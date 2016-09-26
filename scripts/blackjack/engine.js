// Game engine
const NUMBER_OF_DECKS = 4;
const CARD_IMAGE_HEIGHT = 98;
const CARD_IMAGE_WIDTH = 64;

var suite = {
    spades: 0,
    clubs: 1,
    hearts: 2,
    diamonds: 3
};

var power = {
    A: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    10: 9,
    J: 10,
    Q: 11,
    K: 12
};

function getImageCoords(card) {
    var y = suite[card.suite] * CARD_IMAGE_HEIGHT;
    var x = power[card.power] * CARD_IMAGE_WIDTH;
    return [ y, x ];
}

class Participant {
    constructor(name) {
        this.cardsOnBoard = [];
        this.score = 0;
        this.aceCount = 0;
        this.name = name
    }

    drawCard(card) {
        this.cardsOnBoard.push(card);
        var scoreToAdd = 0;
        if (card.power == 'A') {
            if (this.score + 11 > 21) {
                scoreToAdd = 1;
            } else {
                scoreToAdd += 11;
                this.aceCount++;
            }
        } else if (card.power === 'J' || card.power === 'Q' || card.power === 'K') {
            scoreToAdd += 10;
        } else {
            scoreToAdd += parseInt(card.power);
        }

        if (this.score + scoreToAdd > 21) {
            if (this.aceCount > 0) {
                this.score -= 10;
                this.aceCount--;
            } else {
                console.log('bust');
            }
        }
        this.score += scoreToAdd;
        console.log(this.name + ' ' + this.score);
    }
}

class Player extends Participant {
    constructor() {
        super("player");
    }
}

class Dealer extends Participant {
    constructor() {
        super("dealer");
    }
}

class Card {
    constructor(suite, power) {
        this.suite = suite;
        this.power = power;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        for (var i = 0; i < NUMBER_OF_DECKS; i++) {
            for (var sui in suite) {
                for (var pow in power) {
                    var currCard = new Card(sui, pow);
                    this.cards.push(currCard);
                }
            }
        }
        shuffle(this.cards);
        //console.log(this.cards);
    }

    getCard() {
        console.log(this.cards[0]);        
        var drawnCard = this.cards[0];
        this.cards.splice(0, 1);
        return drawnCard;
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var player = new Player();
var dealer = new Dealer();
var deckOfCards = new Deck();

player.drawCard(deckOfCards.getCard());
player.drawCard(deckOfCards.getCard());

dealer.drawCard(deckOfCards.getCard());
dealer.drawCard(deckOfCards.getCard());

getImageCoords(deckOfCards.getCard());