

const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const getUser = () => {
    const token = localStorage.getItem("jwttoken");
    const user = parseJwt(token);

    return user;
}

export default {
    parseJwt,
    getUser
}
