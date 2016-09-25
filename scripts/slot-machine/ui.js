// Game UI

import * as engine from "slotMachineEngine";

const slotOptionsImg = [
    "../img/slot-machine/bar.png",
    "../img/slot-machine/cherry.png",
    "../img/slot-machine/grape.png",
    "../img/slot-machine/lemon.png",
    "../img/slot-machine/pear.png",
    "../img/slot-machine/watermelon.png",
    "../img/slot-machine/seven.png"
];

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='slotMachine'></div>");

    $("#slotMachine")
        .append("<link rel='stylesheet' href='style/slot-machine.css'>")
        .append("<button id='startBtn' class='btn btn-success btn-small btn-block'>Start</button>");

    $("#startBtn").on("click", startGame);
}

function startGame() {
    let isGameInProgress = $("#slotMachine").find("#slotOne").length !== 0;
    if (!isGameInProgress) {
        $("#slotMachine")
            .append("<div id='slotOne' class ='slot'><img /></div>")
            .append("<div id='slotTwo' class ='slot'><img /></div>")
            .append("<div id='slotThree' class ='slot'><img /></div>")
            .append("<div id='result'></div>");

        let iterations = 0;
        let roll = setInterval(function() {
            if (iterations === 30) {
                if (engine.isWinner()) {
                    $("#slotMachine #result").text("YOU WIN!");
                } else {
                    $("#slotMachine #result").text("YOU LOSE!");
                }
                clearInterval(roll);
            }
            rollSlots();
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