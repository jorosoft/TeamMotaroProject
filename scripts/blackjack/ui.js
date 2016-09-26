// Game UI
import * as main from "main";
import * as engine from "blackjackEngine";
import * as models from "blackjackModels";

const CARD_IMAGE_HEIGHT = 98;
const CARD_IMAGE_WIDTH = 75;

var imageSprite = '../img/cards-sprite.png';
var cardCount = 1;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='blackjack'></div>");

    $("#blackjack")
        .append("<link rel='stylesheet' href='style/blackjack.css'>")
        .append("<button id='drawCardBtn' class='btn btn-success btn-block'>Draw Card</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>");

    $("#drawCardBtn").on("click", drawCard);
    $("#backBtn").on("click", backToMenu);
    engine.startGame();

    $("#blackjack")
            .append("<div id='cardOne' class ='card'><img /></div>")
            .append("<div id='cardTwo' class ='card'><img /></div>")
            .append("<div id='cardThree' class ='card'><img /></div>")
            .append("<div id='cardFour' class ='card'><img /></div>");
            
    $('#cardOne').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#cardTwo').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#cardThree').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#cardFour').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    
    var coords;
    coords = models.getImageCoords(engine.getPlayerCard(0));    
    $("#cardOne img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#cardOne img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    coords = models.getImageCoords(engine.getPlayerCard(1));
    $("#cardTwo img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#cardTwo img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));

    coords = models.getImageCoords(engine.getDealerCard(0));    
    $("#cardThree img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#cardThree img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    coords = models.getImageCoords(engine.getDealerCard(1));
    $("#cardFour img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $("#cardFour img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));


    $("#cardThree img").attr("src", imageSprite);
    $("#cardFour img").attr("src", imageSprite);
    
    function drawCard() {
        engine.drawCard();
        cardCount++;
        var cardNumber = 'card' + cardCount;
        $("#blackjack").append("<div id='" + cardNumber + "' class ='card'><img /></div>");
        $('#' + cardNumber).css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
        coords = models.getImageCoords(engine.getPlayerCard(cardCount));    
        $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
        $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    }
}

function backToMenu() {
    engine.clear();
    cardCount = 1;
    $("#blackjack").remove();
    main.showMenu();
}