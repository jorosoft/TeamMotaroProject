export function authKeyGenerator() {
    const AUTH_KEY_LENGTH = 60,
        AUTH_KEY_CHARS = "qwertyuiopasdfghjklzxcvbnmWERTYUIOPASDFGHJKLZXCVBNM";

    function generateAuthKey(uniquePart) {
        let authKey = uniquePart,
            index;

        while (authKey.length < AUTH_KEY_LENGTH) {
            index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
            authKey += AUTH_KEY_CHARS[index];
        }

        return authKey;
    }
}
