// Game UI
import * as main from "main";
import * as engine from "blackjackEngine";
import * as models from "blackjackModels";

const CARD_IMAGE_HEIGHT = 100;
const CARD_IMAGE_WIDTH = 75;
const GAME_COST = 5;
const DELAY = 500;

var imageSprite = '../img/cards-sprite.png',
    imageCardBack = '../img/cardBack.jpg',
    cardCount = 0,
    cardTurned = false,
    cardNumber,
    coords,
    card,
    money,
    bet,
    divId,
    cssId,
    participant,
    whatShouldDealerDo;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='blackjack'></div>");

    $("#blackjack")
        .append("<link rel='stylesheet' href='style/blackjack.css'>")
        .append("<button id='startGameBtn' class='btn btn-success btn-block'>New Game ($5)</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='drawCardBtn' class='btn btn-default btn-small btn-block' disabled>Hit</button>")
        .append("<button id='standBtn' class='btn btn-default btn-small btn-block' disabled>Stand</button>")
        .append("<div id='dealerScore'>Score: 0</div>")
        .append("<div id='dealerField'></div>")
        .append("<div id='message'></div>")
        .append("<div id='playerField'></div>")
        .append("<div id='playerScore'>Score: 0</div>");
        
    $("#startGameBtn").on("click", startGame);
    $("#drawCardBtn").on("click", drawCard);
    $("#standBtn").on("click", stand);
    $("#backBtn").on("click", backToMenu);
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
    cardCountReset();
    engine.startGame();
    $('#startGameBtn').attr('disabled', 'disabled');
    $('#backBtn').attr('disabled', 'disabled');
    $("#dealerField").find('.drawnDealerCard').remove();
    $("#playerField").find('.drawnPlayerCard').remove();
    $('#playerScore').html("Score: 0");
    $('#dealerScore').html("Score: 0");
    window.setTimeout(drawFirstCard, DELAY);

    function drawFirstCard() {
        card = engine.getPlayerCard(0);
        showCard(card, 'player');
        window.setTimeout(drawSecondCard, DELAY);
    }

    function drawSecondCard() {
        card = engine.getDealerCard(0);        
        showCard(card, 'dealer');
        window.setTimeout(drawThirdCard, DELAY);
    }

    function drawThirdCard() {
        card = engine.getPlayerCard(1);        
        showCard(card, 'player');
        window.setTimeout(drawFourthCard, DELAY);
    }

    function drawFourthCard() {
        cardCount++;
        cardTurned = false;
        divId = '#dealerField';
        cssId = 'drawnDealerCard';
        cardNumber = 'card' + cardCount;
        $(divId).append("<div id='" + cardNumber + "' class =" + cssId + "><img /></div>");
        $('#' + cardNumber).css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
        coords = models.getImageCoords(card);
        $('#' + cardNumber + " img").attr("src", imageCardBack);
        $('#' + cardNumber).css('display', 'none')
        .show("slide", {
            direction: "left"
        });
        window.setTimeout(function() {
            $('#playerScore').html("Score: " + engine.getPlayerScore());
            $('#dealerScore').html("Score: ??");
        }, DELAY);
        $('#drawCardBtn').attr('disabled', false);
        $('#standBtn').attr('disabled', false);

        if (engine.getPlayerScore() === 21) {
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');            
            $("#message").html('Blackjack!');
            $("#message").css('color', 'LightGreen');
            stand();
        }
    }
}

function drawCard() {
    showCard(engine.playerDraw(), "player");
    window.setTimeout(function() {
        $('#playerScore').html("Score: " + engine.getPlayerScore());
    }, DELAY);
    $('#drawCardBtn').attr('disabled', 'disabled');
    $('#standBtn').attr('disabled', 'disabled');
    if (engine.getPlayerScore() > 21) {
        window.setTimeout(function() {
            $("#message").html('Bust!');
            $("#message").css('color', 'LightCoral');
            $('#standBtn').attr('disabled', 'disabled');
            $('#startGameBtn').attr('disabled', false);
        }, DELAY);        
    } else if (engine.getPlayerScore() === 21) {
        window.setTimeout(function() {
            $("#message").html('Blackjack!');
            $("#message").css('color', 'LightGreen');
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');
            stand();
        }, DELAY);
    } else {
        window.setTimeout(function() {
            $('#drawCardBtn').attr('disabled', false);
            $('#standBtn').attr('disabled', false);
        }, DELAY);
    }
}

function showCard(card, participant) {
    cardCount++;
    divId = '#' + participant + 'Field';
    cssId = 'drawn' + capitalizeFirstLetter(participant) + 'Card';
    cardNumber = 'card' + cardCount;
    $(divId).append("<div id='" + cardNumber + "' class =" + cssId + "><img /></div>");
    $('#' + cardNumber).css('width', CARD_IMAGE_WIDTH).css('height', CARD_IMAGE_HEIGHT).css('overflow', 'hidden');
    coords = models.getImageCoords(card);
    $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-top', (coords[0] * -1));
    $('#' + cardNumber + " img").attr("src", imageSprite).css('margin-left', (coords[1] * -1));
    $('#' + cardNumber).css('display', 'none')
        .show("slide", {
            direction: "left"
        });
}

function stand() {
    $('#standBtn').attr('disabled', 'disabled');
    $('#drawCardBtn').attr('disabled', 'disabled');
    if (cardTurned === false) {
        coords = models.getImageCoords(engine.getDealerCard(1));
        $("#card4 img")
            .attr("src", imageSprite)
            .css('margin-top', (coords[0] * -1))
            .css('margin-left', (coords[1] * -1))
            .css('height', '')
            .css('width', '');
        cardTurned = true;
        $('#dealerScore').html("Score: " + engine.getDealerScore());
    }
    
    whatShouldDealerDo = engine.whatShouldDealerDo();
    if (whatShouldDealerDo === 'bust') {
        window.setTimeout(function() {
            $("#message").html('You win!');
            $("#message").css('color', 'LightGreen');
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');
            $('#startGameBtn').attr('disabled', false);
            $('#backBtn').attr('disabled', false);
            money = main.getUserMoney() + bet;
            main.setUserMoney(money);
            bet = 0;
            return;
        }, DELAY);        
    } else if (whatShouldDealerDo === 'win') {
        window.setTimeout( function() {
            $("#message").html('You lose!');
            $("#message").css('color', 'LightCoral');
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');
            $('#startGameBtn').attr('disabled', false);
            $('#backBtn').attr('disabled', false);
            return;
        }, DELAY);        
    } else if (whatShouldDealerDo === 'draw') {
        window.setTimeout(function() {
            $("#message").html('Draw!');
            $("#message").css('color', 'LightGreen');
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');
            $('#startGameBtn').attr('disabled', false);
            $('#backBtn').attr('disabled', false);
            money = main.getUserMoney() + bet;
            main.setUserMoney(money);
            bet = 0;
            return;
        }, DELAY);        
    } else if (whatShouldDealerDo === 'drawCard') {
        window.setTimeout(function() {
            showCard(engine.dealerDraw(), "dealer");
            window.setTimeout(function() {
                $('#dealerScore').html("Score: " + engine.getDealerScore());
            }, DELAY);
            stand();
        }, DELAY);
    } else {
        window.setTimeout(function() {
            $("#message").html('You win!');
            $("#message").css('color', 'LightGreen');
            $('#drawCardBtn').attr('disabled', 'disabled');
            $('#standBtn').attr('disabled', 'disabled');
            $('#startGameBtn').attr('disabled', false);
            $('#backBtn').attr('disabled', false);
            money = main.getUserMoney() + bet * 2;
            main.setUserMoney(money);
            bet = 0;
            return;
        }, DELAY);
    }
}

function backToMenu() {
    engine.clear();
    cardCountReset();
    $("#blackjack").remove();
    main.showMenu();
}

function cardCountReset() {
    cardCount = 0;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}