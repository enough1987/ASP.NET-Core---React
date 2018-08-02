import axios from '../interceptors/interceptors';
import jwt from '../helpers/jwt-helper';

const AUTHORISATION_TYPES = Object.freeze({
    REQUEST_IS_AUTHENTICATED: 'REQUEST_IS_AUTHENTICATED',
    IS_AUTHENTICATED : 'IS_AUTHENTICATED',
    IS_NOT_AUTHENTICATED: 'IS_NOT_AUTHENTICATED',
    REQUEST_LOGIN: 'REQUEST_LOGIN',
    REQUEST_FAILED: 'REQUEST_FAILED',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SET_USERS: 'SET_USERS',
    DELETE_USER: 'DELETE_USER'
});

const initialState = {
    newUser: {},
    user: {},
    users: [],
    isLoading: true,
    isAuthenticated: false,
};

export const actionCreators = {
    isAuthorized: () => async (dispatch) => {

        dispatch({ type: AUTHORISATION_TYPES.REQUEST_IS_AUTHENTICATED });

            const url = `api/Admin/isAuthorized`;

            const response = await axios.post(url)
                .then((data) => {
                    const user = jwt.getUser();

                    console.log('++++++', data, user);

                    dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED, payload: user });
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

        const url = `api/Users/GetAllUsers`;

        const response = await axios.get(url)
            .then((data) => {
               dispatch({ type: AUTHORISATION_TYPES.SET_USERS, payload: data.data });
            })
            .catch((e) => {
            });
    },
    deleteUser: (id) => async (dispatch) => {

        const url = `api/Users/Delete?id=${id}`;

        const response = await axios.delete(url)
            .then(() => {
                dispatch({ type: AUTHORISATION_TYPES.DELETE_USER, payload: id });
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
            const user = jwt.getUser();

            dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED, payload: user });
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
            const user = jwt.getUser();

            dispatch({ type: AUTHORISATION_TYPES.IS_AUTHENTICATED, payload: user });
        }

    },
    logout: () => async (dispatch) => {
        jwt.removeToken();
        dispatch({ type: AUTHORISATION_TYPES.LOGOUT });
    }
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
            newUser: {},
            user: action.payload,
            isLoading: false,
            isAuthenticated: true
        };
    }

    if (action.type === AUTHORISATION_TYPES.LOGOUT) {
        return {
            ... state,
            newUser: {},
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

    if ( action.type === AUTHORISATION_TYPES.DELETE_USER ) {
        return {
            ... state,
            users: state.users.filter(user => user.Id !== action.payload)
        }
    }

    return state;
};
