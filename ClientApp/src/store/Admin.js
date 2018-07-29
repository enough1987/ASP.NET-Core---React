import axios from '../interceptors/interceptors';

const USER_TYPES = Object.freeze({
    REQUEST_IS_AUTHENTICATED: 'REQUEST_IS_AUTHENTICATED',
    IS_AUTHENTICATED : 'IS_AUTHENTICATED',
    IS_NOT_AUTHENTICATED: 'IS_NOT_AUTHENTICATED'
});

const initialState = {
    user: {},
    isLoading: true,
    isAuthenticated: false
};

export const actionCreators = {
    isAdmin: () => async (dispatch) => {

        dispatch({ type: USER_TYPES.REQUEST_IS_AUTHENTICATED });

            const url = `api/Admin/IsAdmin`;
            const response = await axios.post(url)
                .then((data) => {
                    console.log('++++++', data, );
                    const token = localStorage.getItem("jwttoken");
                    const user = actionCreators.parseJwt(token);
                    console.log(user);
                    dispatch({ type: USER_TYPES.IS_AUTHENTICATED });
                })
                .catch((e) => {
                    console.log('------');
                    const {status} = e.response;
                    if (status === 401) {
                        dispatch({ type: USER_TYPES.IS_NOT_AUTHENTICATED });
                    }
                });
    },
    parseJwt: (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === USER_TYPES.REQUEST_IS_AUTHENTICATED) {
        return {
            ...state,
            isLoading: true,
            isAuthenticated: false
        };
    }

    if (action.type === USER_TYPES.IS_AUTHENTICATED) {
        return {
            ...state,
            isLoading: false,
            isAuthenticated: true
        };
    }

    if (action.type === USER_TYPES.IS_NOT_AUTHENTICATED) {
        return {
            ... state,
            isLoading: false,
            isAuthenticated: false

        };
    }

    return state;
};
