// Game UI
import * as engine from "rouletteEngine";
import * as main from "main";

const BET_COST = 5;

var money,
    bet;

export function loadGame() {
    $("#menu").find("ul").remove();
    $("#menu").append("<div id='slotMachine'></div>");

    $("#slotMachine")
        .append("<link rel='stylesheet' href='style/slot-machine.css'>")
        .append("<button id='startBtn' class='btn btn-success btn-block'>Start</button>")
        .append("<button id='backBtn' class='btn btn-default btn-small btn-block'>Back to menu</button>")
        .append("<button id='spinBtn' class='btn btn-default btn-small btn-block'>Spin</button>")
        .append("<div id='bettingField'></div>")
        .append("<div id='message'></div>");

    $("#startBtn").on("click", startGame);
    $("#backBtn").on("click", backToMenu);
    $("#spinBtn").on("click", spin);
}

function startGame(){
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
}

function spin(){
    engine.spin();
}

function bettingResult(){
    //The betting field, needs implementation
var selection = '';
var bettingField = $("#bettingField");
var winnings = '';


  }

   function smallWin() {
    $("#message").html('You won!');
    money = main.getUserMoney() + BET_COST;
  }

  function midWin(){
    $("#message").html('You won!');
    money = main.getUserMoney() + 2 * BET_COST;
  }

  function loser() {
    $("#message").html('You lost!');
    money = main.getUserMoney() - BET_COST;
  }

  //Showing the result of the bet
    function result(){ 
    var color = '';
    var pickNum = '';
      switch(text){
        case '3':
        case '9':
        case '12':
        case '18':
        case '21':
        case '27':
        case '30':
        case '36':
        case '5':
        case '14':
        case '23':
        case '29':
        case '32':
        case '1':
        case '7':
        case '16':
        case '19':
        case '25':
        case '34':
          var color = 'red';
          var pickNum = text;
          break;
        case '6':
        case '15':
        case '24':
        case '33':
        case '2':
        case '8':
        case '11':
        case '17':
        case '20':
        case '26':
        case '29':
        case '35':
        case '4':
        case '10':
        case '13':
        case '22':
        case '28':
        case '31':
          var color = 'black';
          var pickNum = text;
          break
        case '0':
        case '00':
          var color = 'green';
          break;
    }

    if(color === 'red' && selection==='red'){
      smallWin()
    }

    if(color === 'black' && selection==='red'){
      loser()
    }

    if(color == 'black' && selection=='black'){
      smallWin();
    }

    if(color == 'red' && selection=='black'){
      loser();
    }

    if(color =='green' && (selection== 'red' || selection== 'black')){
      loser();
    }

    if(selection == 'block1' && (parseInt(text)<13 && parseInt(text)>0)){
      midWin();
    }

    if(selection == 'block1' && (parseInt(text)>=13 || color=='green')){
      loser();
    }

    if(selection == 'block2' && (parseInt(text)>=13 && parseInt(text)<25)){
      midWin();
    }

    if(selection == 'block2' && (parseInt(text)<13 || parseInt(text)>24 || color=='green')){
      loser();
    }

    if(selection == 'block3' && (parseInt(text)>=26 && parseInt(text)<37)){
      midWin();
    }

    if(selection == 'block3' && (parseInt(text)<25 || color=='green')){
      loser();
    }

    if(selection == 'even' && (parseInt(text)%2==0 && (text!= ('0' || '00')))){
      smallWin();
    }

    if(selection == 'even' && (parseInt(text)%2 != 0)){
      loser();
    }

    if(selection == 'odd' && (parseInt(text)%2 != 0)){
      smallWin();
    }

    if(selection == 'odd' && (parseInt(text)%2==0 && (text!= ('0' || '00')))){
      loser();
    }

    if(selection == 'firstHalf' && (parseInt(text)<19 && (text!= ('0' || '00')))){
      smallWin();
    }

    if(selection == 'firstHalf' && (parseInt(text)>=19)){
      loser();
    }

    if(selection == 'secondHalf' && (parseInt(text)>18 && (text!= ('0' || '00')))){
      smallWin();
    }

    if(selection == 'secondHalf' && (parseInt(text)<=18)){
      loser();
    }

    if(selection == text){
      var bet = document.getElementById('bet').value;
      answer.innerHTML='Big win!'
      var winnings = parseInt(bet)*35;
      account+=winnings;
      balance.innerHTML= account
    }

    if(selection == 'row1'){
      switch(text) {
        case '3':
        case '6':
        case '9':
        case '12':
        case '15':
        case "18":
        case '21':
        case '24':
        case '27':
        case '30':
        case '33':
        case '36':
          var row = 'row1';
        break;
      }
      if(row == 'row1'){
        midWin();
      } else {
          loser();
        }
    }

    if(selection == 'row2'){
      switch(text) {
        case '2':
        case '5':
        case '8':
        case '11':
        case '14':
        case "17":
        case '20':
        case '23':
        case '26':
        case '29':
        case '32':
        case '35':
          var row = 'row2';
        break;
      }
      if(row == 'row2'){
        midWin();
      } else {
          loser();
        }
    }

    if(selection == 'row3'){
      switch(text) {
        case '1':
        case '4':
        case '7':
        case '10':
        case '13':
        case "16":
        case '19':
        case '22':
        case '25':
        case '28':
        case '31':
        case '34':
          var row = 'row3';
        break;
      }
        if(row =='row3'){
          midWin();
        } else {
            loser();
          }
    }


    switch(selection){
      case '3':
      case '9':
      case '12':
      case '18':
      case '21':
      case '27':
      case '30':
      case '36':
      case '5':
      case '14':
      case '23':
      case '29':
      case '32':
      case '1':
      case '7':
      case '16':
      case '19':
      case '25':
      case '34':
      case '6':
      case '15':
      case '24':
      case '33':
      case '2':
      case '8':
      case '11':
      case '17':
      case '20':
      case '26':
      case '29':
      case '35':
      case '4':
      case '10':
      case '13':
      case '22':
      case '28':
      case '31':
      case '0':
      case '00':
        if(selection!=text){
          loser();
        }
      break;
    }
}

function backToMenu(){
    
}