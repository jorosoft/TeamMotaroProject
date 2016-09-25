// Game engine

import * as validate from "validator";
import * as models from "slotMachineModels";

let slotHolder = new models.SlotHolder();

function getRandomNumber(fromNumber, toNumber) {
    let random = Math.floor((Math.random() * toNumber) + fromNumber);;
    return random;
}

export function getNextValueForSlot(slotID) {
    switch (slotID) {
        case 1:
            slotHolder.slotOne = getRandomNumber(validate.constants().MIN_SLOT_OPTION_INDEX, validate.constants().MAX_SLOT_OPTION_INDEX);
            return slotHolder.slotOne;
        case 2:
            slotHolder.slotTwo = getRandomNumber(validate.constants().MIN_SLOT_OPTION_INDEX, validate.constants().MAX_SLOT_OPTION_INDEX);
            return slotHolder.slotTwo;
        case 3:
            slotHolder.slotThree = getRandomNumber(validate.constants().MIN_SLOT_OPTION_INDEX, validate.constants().MAX_SLOT_OPTION_INDEX);
            return slotHolder.slotThree;
    }
}

export function isWinner() {
    if (slotHolder.slotOne === slotHolder.slotTwo && slotHolder.slotOne === slotHolder.slotThree) {
        return true;
    }

    return false;
}