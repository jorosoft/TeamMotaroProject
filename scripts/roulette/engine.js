var colors = ['#c10000', "black",'#c10000', "black",'#c10000', "black",'#c10000', "black",
  '#c10000', "black",'#c10000', "black",'#c10000', "black",'#c10000', "black",'#c10000',
   "black",'#30e708','black', "#c10000",'black', "#c10000",'black', "#c10000",'black', "#c10000",
   'black', "#c10000",'black', "#c10000",'black', "#c10000",'black', "#c10000",'black','#c10000', "#30e708"];
  var numbers = ['27','10','25','29','12','8','19','31','18','6','21',
                      '33','16','4','23','35','14','2','0','28','9','26','30',
                      '11','7','20','32','17','5','22','34','15','3','24','36',
                      '13','1','00'];

  var startAngle = 0;
  var arc = Math.PI / 19;
  var spinTimeout = null;

  var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;
  var ctx;

    function drawRoulette() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var outsideRadius = 240;
      var textRadius = 175;
      var insideRadius = 125;
      var middleRadius = 145;
      var canvasWidth = 400;
      var canvasHeight = 400;
      var xCoord = 250;
      var yCoord = 250;
      var amountOfNumbers = 38;
      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      ctx.strokeStyle = "black";
      ctx.lineWidth = 10;

      ctx.font = '14px sans-serif';

      for(var i = 0; i < amountOfNumbers; i++) {
        var angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(xCoord, yCoord, outsideRadius, angle, angle + arc, false);
        ctx.arc(xCoord, yCoord, insideRadius, angle + arc, angle, true);
        ctx.arc(xCoord, yCoord, middleRadius, angle + arc, angle, true);

        ctx.stroke();
        ctx.fill();
        ctx.save();

        ctx.shadowColor = "gray";
        ctx.fillStyle = "white";
        ctx.translate(xCoord + Math.cos(angle + arc / 2) * textRadius, yCoord + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = numbers[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(xCoord - 4, yCoord - (outsideRadius + 5));
      ctx.lineTo(xCoord + 4, yCoord - (outsideRadius + 5));
      ctx.lineTo(xCoord + 4, yCoord - (outsideRadius - 5));
      ctx.lineTo(xCoord + 9, yCoord - (outsideRadius - 5));
      ctx.lineTo(xCoord + 0, yCoord - (outsideRadius - 13));
      ctx.lineTo(xCoord - 9, yCoord - (outsideRadius - 5));
      ctx.lineTo(xCoord - 4, yCoord - (outsideRadius - 5));
      ctx.lineTo(xCoord - 4, yCoord - (outsideRadius + 5));
      ctx.fill();
    }
  }

  //How fast and how long the roulette spins, should have some randomness
  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 10 + 10000;
    rotateWheel();
  }

  //Updates spinning speed and time, changes the spinning angle so we have different numbers
  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRoulette();
    spinTimeout = setTimeout('rotateWheel()', 30);
    //var answer = document.getElementById('answer');
    //answer.innerHTML = '';
  }

  //Stops the wheel and presents the selected number
  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    var text = numbers[index]
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  }

    //The spinning roulette wheel should stop gradually and not suddenly
    function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }

    //Calculates the amount Won
    //TODO: Implement account and balance
    function smallWin() {
    var bet = document.getElementById('bet').value;
    answer.innerHTML= 'You Won!';
    account += parseInt(bet);
    balance.innerHTML= account
  }

  function midWin(){
    var bet = document.getElementById('bet').value;
    answer.innerHTML= 'You Won!';
    var win = parseInt(bet)*2;
    account += win;
    balance.innerHTML= account
  }

  function loser() {
    var bet = document.getElementById('bet').value;
    answer.innerHTML= 'You Lost'
    account -= bet;
    balance.innerHTML= account
  }

//The betting field, needs refactoring
var selection = '';
var tableOut = document.getElementById('board');
var winnings = '';
var balance = document.getElementById('balance');
var account = parseInt(balance.innerHTML);
var row1Array = ['3','6','9','12','15','18','21','24','27','30','33','36']
var select = document.getElementById('selected')
  tableOut.addEventListener('click', function (e) {
    var y = e.target.id;
    selection = y;
    // select.innerHTML = selection;
  })

  //Showing the result of the bet
  var firstBlock = ''
    var color='';
    var pickNum='';
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

  drawRouletteWheel();