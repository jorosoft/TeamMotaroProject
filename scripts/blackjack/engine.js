// Game engine
var NUMBER_OF_DECKS = 4;
var suite = {
    hearts: 1,
    diamonds: 2,
    clubs: 3,
    spades: 4
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
    J: 10,
    Q: 10,
    K: 10,
};

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
        console.log(this.cards);
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

var deckOfCards = new Deck();
