// Game UI
import * as main from "main";
import * as engine from "blackjackEngine";
import * as models from "blackjackModels";

const CARD_IMAGE_HEIGHT = 98;
const CARD_IMAGE_WIDTH = 75;

var imageSprite = '../img/cards-sprite.png',
    cardCount = 1,
    cardNumber,
    coords;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='blackjack'></div>");

    $("#blackjack")
        .append("<link rel='stylesheet' href='style/blackjack.css'>")
        .append("<button id='startGameBtn' class='btn btn-success btn-block'>New Game</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='drawCardBtn' class='btn btn-default btn-small btn-block' disabled>Hit</button>")
        .append("<button id='standBtn' class='btn btn-default btn-small btn-block' disabled>Stand</button>")
        .append("<div id='playerField'></div>")
        .append("<div id='dealerField'></div>");

    $("#startGameBtn").on("click", startGame);
    $("#drawCardBtn").on("click", drawCard);
    $("#drawCardBtn").on("click", stand);
    $("#backBtn").on("click", backToMenu);

    $("#dealerField")    
            .append("<div id='dealerCardZero' class ='card'><img /></div>")
            .append("<div id='dealerCardOne' class ='card'><img /></div>");
    $("#playerField")
            .append("<div id='playerCardZero' class ='card'><img /></div>")
            .append("<div id='playerCardOne' class ='card'><img /></div>");
}

function stand() {

}
    
function drawCard() {
    engine.drawCard();
    cardCount++;
    cardNumber = 'card' + cardCount;
    $("#playerField").append("<div id='" + cardNumber + "' class ='drawnCard'><img /></div>");
    $('#' + cardNumber).css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    coords = models.getImageCoords(engine.getPlayerCard(cardCount));    
    $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    if (engine.getPlayerScore() > 21) {
        $('#drawCardBtn').attr('disabled', 'disabled');
        $('#standBtn').attr('disabled', 'disabled');
        $('#startGameBtn').attr('disabled', false);
    }
}

function startGame() {
    engine.clear();
    cardCount = 1;
    engine.startGame();
    $('#startGameBtn').attr('disabled', 'disabled');
    $('#drawCardBtn').attr('disabled', false);
    $('#standBtn').attr('disabled', false);
    $("#dealerField").find('.drawnCard').remove();
    $("#playerField").find('.drawnCard').remove();
    $('#dealerCardZero').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#dealerCardOne').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#playerCardZero').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#playerCardOne').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
            
    coords = models.getImageCoords(engine.getPlayerCard(0));    
    $("#playerCardZero img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#playerCardZero img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    coords = models.getImageCoords(engine.getPlayerCard(1));
    $("#playerCardOne img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#playerCardOne img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));

    coords = models.getImageCoords(engine.getDealerCard(0));    
    $("#dealerCardZero img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#dealerCardZero img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    coords = models.getImageCoords(engine.getDealerCard(1));
    $("#dealerCardOne img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#dealerCardOne img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
}

function backToMenu() {
    engine.clear();
    cardCount = 1;
    $("#blackjack").remove();
    main.showMenu();
}