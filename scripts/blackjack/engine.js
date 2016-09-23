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

class card {
    constructor(suite, power) {
        this.suite = suite;
        this.power = power;
    }
}

class deck {
    constructor() {
        this.cards = [];
        for (var i = 0; i < NUMBER_OF_DECKS; i++) {
            for (var sui in suite) {
                for (var pow in power) {
                    var currCard = new card(sui, pow);
                    this.cards.push(currCard);
                }
            }
        }        
        console.log(this.cards);
    }
}

var deckOfCards = new deck();