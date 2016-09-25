export function constants() {
    return {
        USER_NOT_LOGGED_MESSAGE: "You must login to play in our casino!",
        MIN_SLOT_OPTION_INDEX: 0,
        MAX_SLOT_OPTION_INDEX: 6
    }
}

export function isUserLogged() {

    // TODO: Implement check user login status 

    return true;
}

export function isIncorrectString(value) {
    if (!value || typeof value !== "string" || value.length === 0) {
        return true;
    }

    return false;
}