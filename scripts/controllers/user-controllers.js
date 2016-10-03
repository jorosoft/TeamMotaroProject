const AUTH_KEY_LENGTH = 60,
    AUTH_KEY_CHARS = "qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM";

export function generateGUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    // then to call it, plus stitch in '4' in the third group
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

export function generateAuthKey(uniquePart) {
    let authKey = uniquePart,
        index;

    while (authKey.length < AUTH_KEY_LENGTH) {
        index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
        authKey += AUTH_KEY_CHARS[index];
    }

    return authKey;
}

export function sendUserToDatabase(userId, user) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('users/' + userId).set({
            guid: user.guid,
            passHash: user.passHash.toString(),
            username: user.username
        });
        resolve(user);
    })
}

export function getUser(userId) {
    return firebase.database().ref('/users/' + userId).once('value').then(function (user) {
        var username = user.val().username;
        var passHash = user.val().passHash;
        console.log(`${username}, ${passHash}`);
    });
}