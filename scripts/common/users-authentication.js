// Casino users authentication


const HTTP_HEADER_KEY = "x-auth-key",
    GENERATED_GUID_KEY = 'guid',
    STORAGE_USERNAME_KEY = "username",
    PASSWORD_AUTH_KEY = "passHashKey";

export function login(respUser) {
    /*return requester.putJSON("/api/auth", user)
     .then(respUser => {*/
    localStorage.setItem(STORAGE_USERNAME_KEY, respUser.username);
    localStorage.setItem(GENERATED_GUID_KEY, respUser.guid);
    localStorage.setItem(HTTP_HEADER_KEY, respUser.authKey);
    localStorage.setItem(PASSWORD_AUTH_KEY, respUser.passHash);
    resolve();
    /* });*/
}

export function register(respUser) {
    //return requester.postJSON("/api/users", user);
    return new Promise((resolve, reject) => {
        localStorage.setItem(STORAGE_USERNAME_KEY, respUser.username);
        localStorage.setItem(GENERATED_GUID_KEY, respUser.guid);
        localStorage.setItem(HTTP_HEADER_KEY, respUser.authKey);
        localStorage.setItem(PASSWORD_AUTH_KEY, respUser.passHash);
        resolve();
    });
}

export function logout() {
    return Promise.resolve()
        .then(() => {
            localStorage.removeItem(STORAGE_USERNAME_KEY);
            localStorage.removeItem(GENERATED_GUID_KEY);
            localStorage.removeItem(HTTP_HEADER_KEY);
            localStorage.removeItem(PASSWORD_AUTH_KEY);
        });
}
export function isLoggedIn() {
    return !!localStorage.getItem(STORAGE_USERNAME_KEY);
}