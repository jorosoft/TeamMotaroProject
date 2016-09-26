// Game UI
import * as main from "main";
import * as engine from "blackjackEngine";
import * as models from "blackjackModels";

var imageSprite = '../img/cards-sprite.png';

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
            
    var coords = models.getImageCoords(engine.getPlayerCard(0));

    $("#cardOne img").attr("src", imageSprite).css('width', 64).css('height', 98);
    $("#cardOne img").attr("src", imageSprite);
    
    $("#cardTwo img").attr("src", imageSprite).width('64px');
    $("#cardThree img").attr("src", imageSprite).width('64px');
    $("#cardFour img").attr("src", imageSprite).width('64px');
    
    function drawCard() {
        engine.drawCard();
    }
}

function backToMenu() {
    engine.clear();
    $("#blackjack").remove();
    main.showMenu();
}