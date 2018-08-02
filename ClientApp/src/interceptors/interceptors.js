
import * as axios from 'axios';
import jwt from "../helpers/jwt-helper";



// Add a response interceptor
axios.interceptors.request.use((request) => {
    // Do something with response data
    console.log("INTERCEPTOR REQUEST");

    const token = jwt.getToken();
    const exp = jwt.isTokenExpired(token);
    console.log(" EXP ", exp);

    if ( token ) {
        request.headers = {
            ...request.headers,
            "Authorization" : "bearer " + token
        };
    }
    return request;
});

// Add a response interceptor
axios.interceptors.response.use((response) => {
    // Do something with response data
    console.log("INTERCEPTOR RESPONSE ", response);

    const token = response.headers.jwttoken;
    if ( token ) {
        jwt.setToken(token);
    }

    return response;
});

export  default axios;