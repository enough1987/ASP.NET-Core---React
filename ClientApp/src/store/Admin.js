import axios from '../interceptors/interceptors';

const AUTHORISATION_TYPES = Object.freeze({
    REQUEST_IS_AUTHENTICATED: 'REQUEST_IS_AUTHENTICATED',
    IS_AUTHENTICATED : 'IS_AUTHENTICATED',
    IS_NOT_AUTHENTICATED: 'IS_NOT_AUTHENTICATED',
    REQUEST_LOGIN: 'REQUEST_LOGIN',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
});

const initialState = {
    user: {},
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
                    const token = localStorage.getItem("jwttoken");
                    const user = actionCreators.parseJwt(token);
                    console.log(user);
                    dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED });
                })
                .catch((e) => {
                    console.log('------');
                    const {status} = e.response;
                    if (status !== 200) {
                        dispatch({ type: AUTHORISATION_TYPES.IS_NOT_AUTHENTICATED });
                    }
                });
    },
    login: (data) => async (dispatch) => {

        dispatch({ type: AUTHORISATION_TYPES.REQUEST_LOGIN });

        const url = `api/Authenticate/Token`;

        const formData  = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await axios.post(
            url,
            formData
        );

        console.log(response, data);

        if (response.data && response.data.access_token) {
            dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED });
        }

    },
    register: (data) => async (dispatch) => {

        dispatch({ type: AUTHORISATION_TYPES.REQUEST_LOGIN });

        const url = `api/Authenticate/Token`;

        const formData  = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await axios.post(
            url,
            formData
        );

        console.log(response, data);

        if (response.data && response.data.access_token) {
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
            isLoading: false,
            isAuthenticated: true
        };
    }

    if (action.type === AUTHORISATION_TYPES.IS_NOT_AUTHENTICATED
        | action.type === AUTHORISATION_TYPES.LOGOUT) {
        return {
            ... state,
            isLoading: false,
            isAuthenticated: false

        };
    }

    return state;
};
