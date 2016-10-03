// Game UI

import * as engine from "slotMachineEngine";
import * as main from "main";

const slotOptionsImg = [
    "../img/slot-machine/bar.png",
    "../img/slot-machine/cherry.png",
    "../img/slot-machine/grape.png",
    "../img/slot-machine/lemon.png",
    "../img/slot-machine/pear.png",
    "../img/slot-machine/watermelon.png",
    "../img/slot-machine/seven.png"
];

let gameStarted = false;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").find("#fb-root").remove();
    $("#menu").append("<div id='slotMachine'></div>");

    $("#slotMachine")
        .append("<link rel='stylesheet' href='style/slot-machine.css'>")
        .append("<button id='startBtn' class='btn btn-success btn-block'>Start</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>");

    $("#startBtn").on("click", startGame);
    $("#backBtn").on("click", backToMenu);
}

function startGame() {
    let isGameInProgress = $("#slotMachine").find("#slotOne").length !== 0;
    if (!gameStarted) {
        if (isGameInProgress) {
            endGame();
        }
        gameStarted = true;
        $("#slotMachine")
            .append("<div id='slotOne' class ='slot'><img /></div>")
            .append("<div id='slotTwo' class ='slot'><img /></div>")
            .append("<div id='slotThree' class ='slot'><img /></div>")
            .append("<div id='result'></div>");

        let iterations = 0;
        let roll = setInterval(function() {
            rollSlots();
            if (iterations === 30) {
                if (engine.isWinner()) {
                    $("#slotMachine #result")
                        .css("color", "blue")
                        .text("YOU WIN!");
                } else {
                    $("#slotMachine #result")
                        .css("color", "red")
                        .text("YOU LOSE!");
                }
                clearInterval(roll);
                gameStarted = false;
            }
            iterations += 1;
        }, 100);
    }
}

function rollSlots() {
    let slotOne = engine.getNextValueForSlot(1);
    let slotTwo = engine.getNextValueForSlot(2);
    let slotThree = engine.getNextValueForSlot(3);

    $("#slotOne img").attr("src", slotOptionsImg[slotOne]);
    $("#slotTwo img").attr("src", slotOptionsImg[slotTwo]);
    $("#slotThree img").attr("src", slotOptionsImg[slotThree]);
}

function endGame() {
    $("#slotMachine #slotOne").remove();
    $("#slotMachine #slotTwo").remove();
    $("#slotMachine #slotThree").remove();
    $("#slotMachine #result").remove();
}

function backToMenu() {
    if (!gameStarted) {
        $("#slotMachine").remove();
        main.showMenu();
    }
}