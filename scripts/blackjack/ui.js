// Game UI
import * as main from "main";
import * as engine from "blackjackEngine";

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
    
    function drawCard() {
        engine.drawCard();
    }
}

function backToMenu() {
    engine.clear();
    $("#blackjack").remove();
    main.showMenu();
}