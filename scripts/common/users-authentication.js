// Casino users authentication

const HTTP_HEADER_KEY = "x-auth-key",
    KEY_STORAGE_USERNAME = "username",
    KEY_STORAGE_AUTH_KEY = "authKey";

export function login(respUser) {
    /*return requester.putJSON("/api/auth", user)
     .then(respUser => {*/
    localStorage.setItem(KEY_STORAGE_USERNAME, respUser.username);
    localStorage.setItem(KEY_STORAGE_AUTH_KEY, respUser.passHash);
    resolve();
    /* });*/
}

export function register(respUser) {
    //return requester.postJSON("/api/users", user);
    return new Promise((resolve, reject) => {
        console.log(respUser);
        localStorage.setItem(KEY_STORAGE_USERNAME, respUser.username);
        localStorage.setItem(KEY_STORAGE_AUTH_KEY, respUser.passHash);
        resolve();
    });
}

export function logout() {
    return Promise.resolve()
        .then(() => {
            localStorage.removeItem(KEY_STORAGE_USERNAME);
            localStorage.removeItem(KEY_STORAGE_AUTH_KEY);
        });
}
export function isLoggedIn() {
    return !!localStorage.getItem(KEY_STORAGE_USERNAME);
}