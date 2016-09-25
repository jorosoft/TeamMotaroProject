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

    $("#startBtn").on("click", function() {
        alert("BAUUU!!");

    });
}