
import * as axios from 'axios';


// Add a response interceptor
axios.interceptors.request.use((request) => {
    // Do something with response data
    console.log("INTERCEPTOR REQUEST");

    const token = localStorage.getItem("jwttoken");

    if ( token ) {
        request.headers = {
            ...request.headers,
            "Authorization" : "Bearer " + token
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
        localStorage.setItem("jwttoken", token);
    }

    return response;
});

export  default axios;