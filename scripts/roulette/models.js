// Game models
'use strict';

import * as engine from "rouletteEngine";

var color = '';
var pickNum = '';

class roulette {

    constructor() {

    }

    spin() {
        engine.spin();
    }

    result() {

        switch (text) {
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
                color = 'red';
                pickNum = text;
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
                color = 'black';
                pickNum = text;
                break;
            case '0':
            case '00':
                color = 'green';
                break;
        }

    }
}
