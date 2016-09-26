// Game engine
import * as models from 'blackjackModels';

function getImageCoords(card) {
    var y = suite[card.suite] * CARD_IMAGE_HEIGHT;
    var x = power[card.power] * CARD_IMAGE_WIDTH;
    return [ y, x ];
}

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

var player = new models.Player();
var dealer = new models.Dealer();
var deckOfCards = new models.Deck();