
const LOGIN_TYPES = Object.freeze({
    REQUEST_LOGIN: 'REQUEST_LOGIN',
    LOGIN: 'LOGIN'
});

const initialState = {
    user: [],
    isLoading: false
};

export const actionCreators = {
    login: (data) => async (dispatch) => {

        dispatch({ type: LOGIN_TYPES.REQUEST_LOGIN });

        const url = `Authenticate/token`;

        let formData  = new FormData();

        for(let name in data) {
            formData.append(name, data[name]);
        }

        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        console.log(response);


    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === LOGIN_TYPES.REQUEST_LOGIN) {
        return {
            ...state,
            isLoading: true
        };
    }


    return state;
};
