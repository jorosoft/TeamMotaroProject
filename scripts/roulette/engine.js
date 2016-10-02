import * as models from "rouletteModels";
import * as ui from "roulette";

var colors = ['#c10000', "black", '#c10000', "black", '#c10000', "black", '#c10000', "black",
    '#c10000', "black", '#c10000', "black", '#c10000', "black", '#c10000', "black", '#c10000',
    "black", '#30e708', 'black', "#c10000", 'black', "#c10000", 'black', "#c10000", 'black', "#c10000",
    'black', "#c10000", 'black', "#c10000", 'black', "#c10000", 'black', "#c10000", 'black', '#c10000', "#30e708"
];
var numbers = ['27', '10', '25', '29', '12', '8', '19', '31', '18', '6', '21',
    '33', '16', '4', '23', '35', '14', '2', '0', '28', '9', '26', '30',
    '11', '7', '20', '32', '17', '5', '22', '34', '15', '3', '24', '36',
    '13', '1', '00'
];

var startAngle = 0;
var arc = Math.PI / 19;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
var text;
var spinAngleStart;
var gameInProgress = false;

export function drawRoulette() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var outsideRadius = 140;
        var textRadius = 115;
        var insideRadius = 95;
        var middleRadius = 105;
        var canvasWidth = 180;
        var canvasHeight = 180;
        var xCoord = 145;
        var yCoord = 145;
        var amountOfNumbers = 38;
        var pause = false;
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 10;

        ctx.font = '14px sans-serif';

        for (var i = 0; i < amountOfNumbers; i++) {
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
            text = numbers[i];
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
export function spin() {
    gameInProgress = true;
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 10 + 10000;
    rotateWheel();
}

//Updates spinning speed and time, changes the spinning angle so we have different numbers
export function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRoulette();
    spinTimeout = setTimeout(rotateWheel, 30);
}

//Stops the wheel and presents the selected number
export function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px sans-serif';
    text = numbers[index]
    ctx.fillText(text, 145 - ctx.measureText(text).width / 2, 145 + 10);
    if (isGameWon(ui.getBet())) {
        ui.showResult("You win!");
    } else {
        ui.showResult("You lose!");
    }
    gameInProgress = false;
}

//The spinning roulette wheel should stop gradually and not suddenly
export function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function isGameWon(bet) {
    let resultIndex;
    switch (bet) {
        case "1st 12":
            if (+text >= 1 && +text <= 12) {
                return true;
            }
            break;
        case "2nd 12":
            if (+text >= 13 && +text <= 24) {
                return true;
            }
            break;
        case "3rd 12":
            if (+text >= 25 && +text <= 36) {
                return true;
            }
            break;
        case "1-18":
            if (+text >= 1 && +text <= 18) {
                return true;
            }
            break;
        case "19-36":
            if (+text >= 19 && +text <= 36) {
                return true;
            }
            break;
        case "Even":
            if (+text % 2 === 0) {
                return true;
            }
            break;
        case "Odd":
            if (+text % 2 !== 0) {
                return true;
            }
            break;
        case "Red":
            resultIndex = numbers.indexOf(text);
            if (colors[resultIndex] === "#c10000") {
                return true;
            }
            break;
        case "Black":
            resultIndex = numbers.indexOf(text);
            if (colors[resultIndex] === "black") {
                return true;
            }
            break;
        case "00":
            if (text === bet) {
                return true;
            }
            break;
        default:
            if (+text === +bet) {
                return true;
            }
            break;
    }

    return false;
}

export function isGameInProgress() {
    return gameInProgress;
}