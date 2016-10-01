// Game engine
import * as models from 'blackjackModels';

const DEALER_STAND = 17;
const BLACKJACK = 21;

export function startGame() {
    player.drawCard(deckOfCards.getCard());
    dealer.drawCard(deckOfCards.getCard());
    player.drawCard(deckOfCards.getCard());
    dealer.drawCard(deckOfCards.getCard());
}

export function drawCard() {
    return deckOfCards.getCard();    
}

export function playerDraw() {
    var card = deckOfCards.getCard();
    player.drawCard(card);
    return card;
}
export function dealerDraw() {
    var card = deckOfCards.getCard();
    dealer.drawCard(card);
    return card;
}

export function clear() {
    player.score = 0;
    player.cardsOnBoard = [];
    player.aceCount = 0;
    dealer.score = 0;
    dealer.cardsOnBoard = [];
    dealer.aceCount = 0;
    console.clear();
}

export function getPlayerCard(index) {
    return player.cardsOnBoard[index];
}

export function getDealerCard(index) {
    return dealer.cardsOnBoard[index];
}

export function getPlayerScore() {
    return player.score;
}

export function getDealerScore() {
    return dealer.score;
}

export function whatShouldDealerDo() {
    if (getDealerScore() > BLACKJACK) {
        return 'bust';
    } else if (compareScore() < 0) {
        return 'win';
    } else if (compareScore() === 0 && getDealerScore() >= DEALER_STAND) {
        return 'draw';        
    } else if (compareScore() >= 0 && getDealerScore() < DEALER_STAND) {
        return 'drawCard';
    } else {
        return 'lose';
    }
}

function compareScore() {
    if (getPlayerScore() > getDealerScore()) {
        return 1;
    } else if (getPlayerScore() == getDealerScore()) {
        return 0;
    } else {
        return -1;
    }
}


var player = new models.Player();
var dealer = new models.Dealer();
var deckOfCards = new models.Deck();