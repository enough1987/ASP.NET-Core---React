
const JWT_TOKEN = "jwttoken";
const EXP_TOKEN = 1000;

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const isTokenExpired = (token) => {
    try {
        const decoded = parseJwt(token);
        console.log(decoded);
        if (decoded.exp < Date.now() / EXP_TOKEN) { // Checking if token is expired. N
            return true;
        }
        else
            return false;
    }
    catch (err) {
        return false;
    }
}

const getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem(JWT_TOKEN);
}

const setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem(JWT_TOKEN, idToken);
}

const removeToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.removeItem(JWT_TOKEN);
}

const getUser = () => {
    const token = getToken();
    const user = parseJwt(token);

    return user;
}

export default {
    parseJwt,
    getToken,
    setToken,
    removeToken,
    getUser,
    isTokenExpired
}
