// Game UI
import * as main from "main";
import * as engine from "blackjackEngine";
import * as models from "blackjackModels";

const CARD_IMAGE_HEIGHT = 98;
const CARD_IMAGE_WIDTH = 75;
const GAME_COST = 5;
const DEALER_STAND = 17;

var imageSprite = '../img/cards-sprite.png',
    imageCardBack = '../img/cardBack.jpg',
    cardCount = 1,
    dealerCount = 1,
    cardNumber,
    coords,
    money,
    bet;

function cardCountReset() {
    cardCount = 1;
    dealerCount = 1;
}

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='blackjack'></div>");

    $("#blackjack")
        .append("<link rel='stylesheet' href='style/blackjack.css'>")
        .append("<button id='startGameBtn' class='btn btn-success btn-block'>New Game ($5)</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='drawCardBtn' class='btn btn-default btn-small btn-block' disabled>Hit</button>")
        .append("<button id='standBtn' class='btn btn-default btn-small btn-block' disabled>Stand</button>")
        .append("<div id='playerField'></div>")
        .append("<div id='dealerField'></div>");

    $("#startGameBtn").on("click", startGame);
    $("#drawCardBtn").on("click", drawCard);
    $("#standBtn").on("click", stand);
    $("#backBtn").on("click", backToMenu);

    $("#dealerField")
        .append("<div id='dealerCardZero' class ='card'><img /></div>")
        .append("<div id='dealerCardOne' class ='card'><img /></div>");
    $("#playerField")
        .append("<div id='playerCardZero' class ='card'><img /></div>")
        .append("<div id='playerCardOne' class ='card'><img /></div>");

    $("#blackjack").append("<div id='message'></div>");
}

function stand() {
    coords = models.getImageCoords(engine.getDealerCard(1));
    $("#dealerCardOne img")
        .attr("src", imageSprite)
        .css('margin-top', (coords[0] * -1))
        .css('margin-left', (coords[1] * -1))
        .css('height', '')
        .css('width', '');
    //$("#dealerCardOne img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    $('#standBtn').attr('disabled', 'disabled');
    if (compareScore() < 0) {
        $("#message").html('You lose!');
        $("#message").css('color', 'LightCoral');
        $('#drawCardBtn').attr('disabled', 'disabled');
        $('#standBtn').attr('disabled', 'disabled');
        $('#startGameBtn').attr('disabled', false);
        return;
    } else if (compareScore() == 0 && engine.getDealerScore() >= DEALER_STAND) {
        $("#message").html('Draw!');
        $("#message").css('color', 'LightGreen');
        $('#drawCardBtn').attr('disabled', 'disabled');
        $('#standBtn').attr('disabled', 'disabled');
        $('#startGameBtn').attr('disabled', false);
        money = main.getUserMoney() + bet;
        main.setUserMoney(money);
        bet = 0;
        return;
    } else if (compareScore() == 0 && engine.getDealerScore() < DEALER_STAND) {
        dealerDraw();
    } else if (compareScore() > 0 && engine.getDealerScore() < DEALER_STAND) {
        dealerDraw();
    } else {
        $("#message").html('You win!');
        $("#message").css('color', 'LightGreen');
        $('#drawCardBtn').attr('disabled', 'disabled');
        $('#standBtn').attr('disabled', 'disabled');
        $('#startGameBtn').attr('disabled', false);
        money = main.getUserMoney() + bet * 2;
        main.setUserMoney(money);
        bet = 0;
        return;
    }

    function dealerDraw() {
        engine.dealerDraw();
        dealerCount++;
        cardNumber = 'dealerCard' + dealerCount;
        $("#dealerField").append("<div id='" + cardNumber + "' class ='drawnDealerCard'><img /></div>");
        $('#' + cardNumber).css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
        coords = models.getImageCoords(engine.getDealerCard(dealerCount));
        $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
        $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
        $('#' + cardNumber).css('display', 'none')
            .show("slide", {
                direction: "left"
            });
        if (engine.getDealerScore() > 21) {
            $("#message").html('You win!');
            $("#message").css('color', 'LightGreen');
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');
            $('#startGameBtn').attr('disabled', false);
            money = main.getUserMoney() + bet * 2;
            main.setUserMoney(money);
            bet = 0;
            return;
        } else if (engine.getDealerScore() === 21) {
            $("#message").html('Blackjack!');
            $("#message").css('color', 'LightCoral');
            $('#drawCardBtn').attr('disabled', 'disabled');
            window.setTimeout(stand, 1000)
        } else {
            window.setTimeout(stand, 1000)
        }
    }
}

function compareScore() {
    if (engine.getPlayerScore() > engine.getDealerScore()) {
        return 1;
    } else if (engine.getPlayerScore() == engine.getDealerScore()) {
        return 0;
    } else {
        return -1;
    }
}

function drawCard() {
    engine.drawCard();
    cardCount++;
    cardNumber = 'card' + cardCount;
    $("#playerField").append("<div id='" + cardNumber + "' class ='drawnCard'><img /></div>");
    $('#' + cardNumber)
        .css('width', CARD_IMAGE_WIDTH)
        .css('height', CARD_IMAGE_HEIGHT)
        .css('overflow', 'hidden');
    coords = models.getImageCoords(engine.getPlayerCard(cardCount));
    $('#' + cardNumber + " img")
        .attr("src", imageSprite)
        .css('margin-top', (coords[0] * -1))
        .css('margin-left', (coords[1] * -1));
    $('#' + cardNumber)
        .css('display', 'none')
        .show("slide", {
            direction: "left"
        });
    //$('#' + cardNumber + " img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    if (engine.getPlayerScore() > 21) {
        $("#message").html('Bust!');
        $("#message").css('color', 'LightCoral');
        $('#drawCardBtn').attr('disabled', 'disabled');
        $('#standBtn').attr('disabled', 'disabled');
        $('#startGameBtn').attr('disabled', false);
    } else if (engine.getPlayerScore() === 21) {
        $("#message").html('Blackjack!');
        $("#message").css('color', 'LightGreen');
        $('#drawCardBtn').attr('disabled', 'disabled');
    }
}

function startGame() {
    $("#message").html('');
    if (main.getUserMoney() < GAME_COST) {
        $("#message").html('Insufficent funds!');
        $("#message").css('color', 'LightCoral');
        return;
    }
    money = main.getUserMoney() - GAME_COST;
    bet = GAME_COST;
    main.setUserMoney(money);
    engine.clear();
    cardCountReset()
    engine.startGame();
    $('#startGameBtn').attr('disabled', 'disabled');
    $("#dealerField").find('.drawnDealerCard').remove();
    $("#playerField").find('.drawnCard').remove();
    $("#playerCardZero img").removeAttr("src");
    $("#playerCardOne img").removeAttr("src");
    $("#dealerCardZero img").removeAttr("src");
    $("#dealerCardOne img").removeAttr("src");
    $('#dealerCardZero').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#dealerCardOne').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#playerCardZero').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    $('#playerCardOne').css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');

    window.setTimeout(drawFirstCard, 1000);

    function drawFirstCard() {
        coords = models.getImageCoords(engine.getPlayerCard(0));
        $("#playerCardZero img")
            .attr("src", imageSprite)
            .css('margin-top', (coords[0] * -1))
            .css('margin-left', (coords[1] * -1));
        $("#playerCardZero")
            .css('display', 'none')
            .show("slide", {
                direction: "left"
            });
        //$("#playerCardZero img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
        window.setTimeout(drawSecondCard, 1000);
    }

    function drawSecondCard() {
        coords = models.getImageCoords(engine.getDealerCard(0));
        $("#dealerCardZero img")
            .attr("src", imageSprite)
            .css('margin-top', (coords[0] * -1))
            .css('margin-left', (coords[1] * -1));
        $("#dealerCardZero")
            .css('display', 'none')
            .show("slide", {
                direction: "left"
            });
        //$("#dealerCardZero img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
        window.setTimeout(drawThirdCard, 1000);
    }

    function drawThirdCard() {
        coords = models.getImageCoords(engine.getPlayerCard(1));
        $("#playerCardOne img")
            .attr("src", imageSprite)
            .css('margin-top', (coords[0] * -1))
            .css('margin-left', (coords[1] * -1));
        $("#playerCardOne")
            .css('display', 'none')
            .show("slide", {
                direction: "left"
            });
        //$("#playerCardOne img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
        window.setTimeout(drawFourthCard, 1000);
    }

    function drawFourthCard() {
        coords = models.getImageCoords(engine.getDealerCard(1));
        $("#dealerCardOne img")
            .attr("src", imageCardBack)
            .css('height', CARD_IMAGE_HEIGHT)
            .css('width', CARD_IMAGE_WIDTH)
            .css('margin-top', '')
            .css('margin-left', '');
        $("#dealerCardOne")
            .css('display', 'none')
            .show("slide", {
                direction: "left"
            });
        $('#drawCardBtn').attr('disabled', false);
        $('#standBtn').attr('disabled', false);

        if (engine.getPlayerScore() === 21) {
            $('#drawCardBtn').attr('disabled', 'disabled');
            $("#message").html('Blackjack!');
            $("#message").css('color', 'LightGreen');
        }
    }
}

function backToMenu() {
    engine.clear();
    cardCountReset()
    $("#blackjack").remove();
    main.showMenu();
}