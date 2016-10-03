// Casino common models
export class User {
    constructor(username) {
        this._username = username;
        this._money = 100;
    }

    get money() {
        return this._money;
    }

    set money(value) {
        this._money = value;
    }
}