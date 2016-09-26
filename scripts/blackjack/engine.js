// Game engine
const NUMBER_OF_DECKS = 4;

var suite = {
    spades: 0,
    clubs: 1,
    hearts: 2,
    diamonds: 3
};

var power = {
    A: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13
};

function getImageCoords(card) {
    var y = suite[card.suite] * 98;
    var x = power[card.power] * 64;
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