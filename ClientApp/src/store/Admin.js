
const USER_TYPES = Object.freeze({
    REQUEST_IS_AUTHENTICATED: 'REQUEST_IS_AUTHENTICATED',
    IS_AUTHENTICATED : 'IS_AUTHENTICATED',
    IS_NOT_AUTHENTICATED: 'IS_NOT_AUTHENTICATED'
});

const initialState = {
    user: {},
    isLoading: false,
    isAuthenticated: false
};

export const actionCreators = {
    isAdmin: () => async (dispatch) => {

        dispatch({ type: USER_TYPES.REQUEST_IS_AUTHENTICATED });

            const url = `Admin/IsAdmin`;
            const response = await fetch(url, {
                method: "POST"
            });

            console.log(response);

            if ( response.status == 401) {
                return dispatch({ type: USER_TYPES.IS_NOT_AUTHENTICATED });
            }
            //const items = await response.json();

            dispatch({ type: USER_TYPES.IS_AUTHENTICATED });


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
