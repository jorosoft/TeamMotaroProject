// Game UI
import * as engine from "rouletteEngine";
import * as main from "main";

const BET_COST = 5;

var money,
    bet,
    selection;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='roulette'></div>");

    showRouletteTable();

    $("#roulette")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='spinBtn' class='btn btn-default btn-small btn-block'>Spin</button>")
        .append("<link rel='stylesheet' href='style/roulette.css'>");
    //     .append("<button id='startBtn' class='btn btn-success btn-block'>Start</button>")
    //     .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
    //     .append("<button id='spinBtn' class='btn btn-default btn-small btn-block'>Spin</button>")
    //     .append("<div id='bettingField'><table id='table'><tr><td>Red</td><td>Black</td></tr><tr><td>Odd</td><td>Even</td></tr></table></div>")
    //     .append("<canvas id='canvas' width='500' height='400'></canvas>")
    //     .append("<div id='message'></div>");

    // $("#startBtn").on("click", startGame);
    $("#backBtn").on("click", backToMenu);
    $("#spinBtn").on("click", startGame);
    // $("#table").on('click', 'td', function() {
    //     alert($(this).text());
    //     selection = $(this).text();
    // });
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

function showRouletteTable() {
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
                <td class='green'>2-1</td>
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
                <td class='green'>2-1</td>
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
                <td class='green'>2-1</td>
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

function spin() {
    engine.spin();
}

function bettingResult() {

}

function smallWin() {
    $("#message").html('You won!');
    money = main.getUserMoney() + BET_COST;
}

function midWin() {
    $("#message").html('You won!');
    money = main.getUserMoney() + 2 * BET_COST;
}

function loser() {
    $("#message").html('You lost!');
    money = main.getUserMoney() - BET_COST;
}

//Showing the result of the bet
// function result() {
//   var color = '';
//   var pickNum = '';
//   switch (text) {
//     case '3':
//     case '9':
//     case '12':
//     case '18':
//     case '21':
//     case '27':
//     case '30':
//     case '36':
//     case '5':
//     case '14':
//     case '23':
//     case '29':
//     case '32':
//     case '1':
//     case '7':
//     case '16':
//     case '19':
//     case '25':
//     case '34':
//       color = 'red';
//       pickNum = text;
//       break;
//     case '6':
//     case '15':
//     case '24':
//     case '33':
//     case '2':
//     case '8':
//     case '11':
//     case '17':
//     case '20':
//     case '26':
//     case '29':
//     case '35':
//     case '4':
//     case '10':
//     case '13':
//     case '22':
//     case '28':
//     case '31':
//       color = 'black';
//       pickNum = text;
//       break;
//     case '0':
//     case '00':
//       color = 'green';
//       break;
//   }

//   if (color === 'red' && selection === 'red') {
//     smallWin();
//   }

//   if (color === 'black' && selection === 'red') {
//     loser();
//   }

//   if (color === 'black' && selection === 'black') {
//     smallWin();
//   }

//   if (color === 'red' && selection === 'black') {
//     loser();
//   }

//   if (color === 'green' && (selection == 'red' || selection === 'black')) {
//     loser();
//   }

//   if (selection === 'block1' && (parseInt(text) < 13 && parseInt(text) > 0)) {
//     midWin();
//   }

//   if (selection === 'block1' && (parseInt(text) >= 13 || color === 'green')) {
//     loser();
//   }

//   if (selection === 'block2' && (parseInt(text) >= 13 && parseInt(text) < 25)) {
//     midWin();
//   }

//   if (selection === 'block2' && (parseInt(text) < 13 || parseInt(text) > 24 || color == 'green')) {
//     loser();
//   }

//   if (selection === 'block3' && (parseInt(text) >= 26 && parseInt(text) < 37)) {
//     midWin();
//   }

//   if (selection === 'block3' && (parseInt(text) < 25 || color === 'green')) {
//     loser();
//   }

//   if (selection === 'even' && (parseInt(text) % 2 === 0 && (text != ('0' || '00')))) {
//     smallWin();
//   }

//   if (selection === 'even' && (parseInt(text) % 2 !== 0)) {
//     loser();
//   }

//   if (selection === 'odd' && (parseInt(text) % 2 !== 0)) {
//     smallWin();
//   }

//   if (selection == 'odd' && (parseInt(text) % 2 === 0 && (text !== ('0' || '00')))) {
//     loser();
//   }

//   if (selection === 'firstHalf' && (parseInt(text) < 19 && (text !== ('0' || '00')))) {
//     smallWin();
//   }

//   if (selection === 'firstHalf' && (parseInt(text) >= 19)) {
//     loser();
//   }

//   if (selection === 'secondHalf' && (parseInt(text) > 18 && (text !== ('0' || '00')))) {
//     smallWin();
//   }

//   if (selection === 'secondHalf' && (parseInt(text) <= 18)) {
//     loser();
//   }

//   if (selection === text) {
//     $("#message").html('Big win!');
//     money = main.getUserMoney() + 35 * BET_COST;
//   }

//   if (selection === 'row1') {
//     switch (text) {
//       case '3':
//       case '6':
//       case '9':
//       case '12':
//       case '15':
//       case "18":
//       case '21':
//       case '24':
//       case '27':
//       case '30':
//       case '33':
//       case '36':
//         var row = 'row1';
//         break;
//     }
//     if (row === 'row1') {
//       midWin();
//     } else {
//       loser();
//     }
//   }

//   if (selection === 'row2') {
//     switch (text) {
//       case '2':
//       case '5':
//       case '8':
//       case '11':
//       case '14':
//       case "17":
//       case '20':
//       case '23':
//       case '26':
//       case '29':
//       case '32':
//       case '35':
//         let row = 'row2';
//         break;
//     }
//     if (row === 'row2') {
//       midWin();
//     } else {
//       loser();
//     }
//   }

//   if (selection === 'row3') {
//     switch (text) {
//       case '1':
//       case '4':
//       case '7':
//       case '10':
//       case '13':
//       case "16":
//       case '19':
//       case '22':
//       case '25':
//       case '28':
//       case '31':
//       case '34':
//         let row = 'row3';
//         break;
//     }
//     if (row === 'row3') {
//       midWin();
//     } else {
//       loser();
//     }
//   }


//   switch (selection) {
//     case '3':
//     case '9':
//     case '12':
//     case '18':
//     case '21':
//     case '27':
//     case '30':
//     case '36':
//     case '5':
//     case '14':
//     case '23':
//     case '29':
//     case '32':
//     case '1':
//     case '7':
//     case '16':
//     case '19':
//     case '25':
//     case '34':
//     case '6':
//     case '15':
//     case '24':
//     case '33':
//     case '2':
//     case '8':
//     case '11':
//     case '17':
//     case '20':
//     case '26':
//     case '29':
//     case '35':
//     case '4':
//     case '10':
//     case '13':
//     case '22':
//     case '28':
//     case '31':
//     case '0':
//     case '00':
//       if (selection !== text) {
//         loser();
//       }
//       break;
//   }
// }

function backToMenu() {
    $("#roulette").remove();
    main.showMenu();
}