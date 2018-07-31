import axios from '../interceptors/interceptors';

const AUTHORISATION_TYPES = Object.freeze({
    REQUEST_IS_AUTHENTICATED: 'REQUEST_IS_AUTHENTICATED',
    IS_AUTHENTICATED : 'IS_AUTHENTICATED',
    IS_NOT_AUTHENTICATED: 'IS_NOT_AUTHENTICATED',
    REQUEST_LOGIN: 'REQUEST_LOGIN',
    REQUEST_FAILED: 'REQUEST_FAILED',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET_USERS: 'SET_USERS'
});

const initialState = {
    user: {},
    users: [],
    isLoading: true,
    isAuthenticated: false
};

export const actionCreators = {
    isAdmin: () => async (dispatch) => {

        dispatch({ type: AUTHORISATION_TYPES.REQUEST_IS_AUTHENTICATED });

            const url = `api/Admin/IsAdmin`;

            const response = await axios.post(url)
                .then((data) => {
                    console.log('++++++', data, );
                    dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED });
                })
                .catch((e) => {
                    console.log('------');
                    const {status} = e.response;
                    if (status !== 200) {
                        dispatch({ type: AUTHORISATION_TYPES.IS_NOT_AUTHENTICATED });
                    } else {
                        dispatch({ type: AUTHORISATION_TYPES.REQUEST_FAILED });
                    }
                });
    },
    getAllUsers: () => async (dispatch) => {

        const token = localStorage.getItem("jwttoken");
        if (token) {
            console.log( 'USER FROM JWT ', actionCreators.parseJwt(token) );
        }

        const url = `api/Authenticate/GetAllUsers`;

        const response = await axios.get(url)
            .then((data) => {
               dispatch({ type: AUTHORISATION_TYPES.SET_USERS, payload: data.data });
            })
            .catch((e) => {
            });
    },
    login: (data) => async (dispatch) => {

        //dispatch({ type: AUTHORISATION_TYPES.REQUEST_LOGIN });

        const url = `api/Authenticate/Login`;

        const formData  = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await axios.post(
            url,
            formData
        ).catch((e) => {
            dispatch({ type: AUTHORISATION_TYPES.REQUEST_FAILED });
        });

        console.log(response, data);

        if (response && response.data && response.data.access_token) {
            dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED });
        }

    },
    register: (data) => async (dispatch) => {

        //dispatch({ type: AUTHORISATION_TYPES.REQUEST_LOGIN });

        const url = `api/Authenticate/Register`;

        const formData  = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await axios.post(
            url,
            formData
        ).catch((e) => {
            dispatch({ type: AUTHORISATION_TYPES.REQUEST_FAILED });
        });

        console.log(response, data);

        if (response && response.data && response.data.access_token) {
            dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED });
        }

    },
    logout: () => async (dispatch) => {
        localStorage.removeItem("jwttoken");
        dispatch({ type: AUTHORISATION_TYPES.LOGOUT });
    },
    parseJwt: (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === AUTHORISATION_TYPES.REQUEST_IS_AUTHENTICATED
        || action.type === AUTHORISATION_TYPES.REQUEST_LOGIN ) {
        return {
            ...state,
            isLoading: true,
            isAuthenticated: false
        };
    }

    if (action.type === AUTHORISATION_TYPES.IS_AUTHENTICATED) {
        return {
            ...state,
            user: {},
            isLoading: false,
            isAuthenticated: true
        };
    }

    if (action.type === AUTHORISATION_TYPES.LOGOUT) {
        return {
            ... state,
            user: {},
            isLoading: false,
            isAuthenticated: false

        };
    }

    if (action.type === AUTHORISATION_TYPES.IS_NOT_AUTHENTICATED
        | action.type === AUTHORISATION_TYPES.REQUEST_FAILED) {
        return {
            ... state,
            isLoading: false,
            isAuthenticated: false

        };
    }

    if ( action.type === AUTHORISATION_TYPES.SET_USERS ) {
        return {
            ... state,
            users: action.payload
        }
    }

    return state;
};
