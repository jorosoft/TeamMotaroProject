// Game engine
import * as models from 'blackjackModels';

export function startGame() {
    player.drawCard(deckOfCards.getCard());
    player.drawCard(deckOfCards.getCard());

    dealer.drawCard(deckOfCards.getCard());
    dealer.drawCard(deckOfCards.getCard());
}

export function drawCard() {
    player.drawCard(deckOfCards.getCard());    
}

export function clear() {
    player.score = 0;
    dealer.score = 0;
    console.clear();
}

export function getPlayerCard(index) {
    return player.cardsOnBoard[index];
}

var player = new models.Player();
var dealer = new models.Dealer();
var deckOfCards = new models.Deck();