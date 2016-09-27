// Game UI
import * as engine from "rouletteEngine";
import * as main from "main";

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='slotMachine'></div>");

    $("#slotMachine")
        .append("<link rel='stylesheet' href='style/slot-machine.css'>")
        .append("<button id='startBtn' class='btn btn-success btn-block'>Start</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='spinBtn' class='btn btn-default btn-small btn-block'>Spin</button>")
        .append("<div id='bettingField'></div>");

    $("#startBtn").on("click", startGame);
    $("#backBtn").on("click", backToMenu);
    $("#spinBtn").on("click", spin);
}

function startGame(){

}

function spin(){

}

function bettingResult(){

}

function backToMenu(){
    
}