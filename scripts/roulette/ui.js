// Game UI
import * as engine from "rouletteEngine";
import * as main from "main";

const BET_COST = 5;

var money,
    bet;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='roulette'></div>");

    showRouletteTable();

    $("#roulette")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='spinBtn' class='btn btn-default btn-small btn-block'>Spin</button>")
        .append("<link rel='stylesheet' href='style/roulette.css'>");
    //     .append("<div id='message'></div>");

    $("#backBtn").on("click", backToMenu);
    $("#spinBtn").on("click", startGame);
}

function startGame() {
    $("#rouletteTable").remove();
    $("#roulette")
        .append("<canvas id='canvas' width='500' height='400'></canvas>")
        .append("<div id='message'></div>");
    $("#message").html('');
    if (main.getUserMoney() < BET_COST) {
        $("#message").html('Insufficent funds!');
        $("#message").css('color', 'LightCoral');
        return;
    }
    money = main.getUserMoney() - BET_COST;
    bet = BET_COST;
    main.setUserMoney(money);

    engine.drawRoulette();
    engine.spin();
}

export function showRouletteTable() {
    $("#roulette").append("<div id='rouletteTable'></div>");
    $("#rouletteTable").html(`
        <table>
            <tr>
                <td class='green' rowspan='2'>00</td>
                <td class='red'>3</td>
                <td class='black'>6</td>
                <td class='red'>9</td>
                <td class='red'>12</td>
                <td class='black'>15</td>
                <td class='red'>18</td>
                <td class='red'>21</td>
                <td class='black'>24</td>
                <td class='red'>27</td>
                <td class='red'>30</td>
                <td class='black'>33</td>
                <td class='red'>36</td>
            </tr>
            <tr>
                <td class='black'>2</td>
                <td class='red'>5</td>
                <td class='black'>8</td>
                <td class='black'>11</td>
                <td class='red'>14</td>
                <td class='black'>17</td>
                <td class='black'>20</td>
                <td class='red'>23</td>
                <td class='black'>26</td>
                <td class='black'>29</td>
                <td class='red'>32</td>
                <td class='black'>35</td>
            </tr>
            <tr>
                <td class='green'>0</td>
                <td class='red'>1</td>
                <td class='black'>4</td>
                <td class='red'>7</td>
                <td class='black'>10</td>
                <td class='black'>13</td>
                <td class='red'>16</td>
                <td class='black'>19</td>
                <td class='black'>22</td>
                <td class='red'>25</td>
                <td class='red'>28</td>
                <td class='black'>31</td>
                <td class='red'>34</td>
            </tr>
            <tr>
                <td class='no-border'></td>
                <td class='green'colspan='4'>1st 12</td>
                <td class='green' colspan='4'>2nd 12</td>
                <td class='green' colspan='4'>3rd 12</td>
                <td class='no-border'></td>
            </tr>
            <tr>
                <td class='no-border'></td>
                <td class='green' colspan='2'>1-18</td>
                <td class='green' colspan='2'>Even</td>
                <td class='red' colspan='2'>Red</td>
                <td class='black' colspan='2'>Black</td>
                <td class='green' colspan='2'>Odd</td>
                <td class='green' colspan='2'>19-36</td>
                <td class='no-border'></td>
            </tr>
        </table>`);

    $("#roulette").append("<div id='selectedBet'>Your bet is on: <span></span></div>");

    $("#rouletteTable td:not(.no-border)").on("click", (ev) => selectBet($(ev.target)));
}

function selectBet(selected) {
    const selectedColor = "rgb(186,85,211)";
    let options = $("#rouletteTable td");
    for (let i = 0; i < options.length; i += 1) {
        let currentOption = $(options[i]);
        currentOption.css("color", "white");
    }

    selected.css("color", selectedColor);
    $("#selectedBet span").html(selected.html());
}

export function getBet() {
    return $("#selectedBet span").html();
}

// function smallWin() {
//     $("#message").html('You won!');
//     money = main.getUserMoney() + BET_COST;
// }

// function midWin() {
//     $("#message").html('You won!');
//     money = main.getUserMoney() + 2 * BET_COST;
// }

// function loser() {
//     $("#message").html('You lost!');
//     money = main.getUserMoney() - BET_COST;
// }

function backToMenu() {
    $("#roulette").remove();
    main.showMenu();
}