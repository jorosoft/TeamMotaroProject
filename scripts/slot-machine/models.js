// Game models

import * as validate from "validator";

export class SlotHolder {
    constructor() {
        this.slotOne = 0;
        this.slotTwo = 0;
        this.slotThree = 0;
    }

    get slotOne() {
        return this._one;
    }

    set slotOne(value) {
        if (value < validate.constants().MIN_SLOT_OPTION_INDEX || value > validate.constants().MAX_SLOT_OPTION_INDEX) {
            throw new Error("Value not in range!");
        }

        this._one = value;
    }

    get slotTwo() {
        return this._two;
    }

    set slotTwo(value) {
        if (value < validate.constants().MIN_SLOT_OPTION_INDEX || value > validate.constants().MAX_SLOT_OPTION_INDEX) {
            throw new Error("Value not in range!");
        }

        this._two = value;
    }

    get slotThree() {
        return this._three;
    }

    set slotThree(value) {
        if (value < validate.constants().MIN_SLOT_OPTION_INDEX || value > validate.constants().MAX_SLOT_OPTION_INDEX) {
            throw new Error("Value not in range!");
        }

        this._three = value;
    }
}