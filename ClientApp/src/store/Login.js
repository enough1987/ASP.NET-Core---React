import axios from '../interceptors/interceptors';

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

        const url = `api/Authenticate/Token`;

        const formData  = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));

        const response = await axios.post(
            url,
            formData
        );

        console.log(response, data);


    }
};

export const reducer = (state = initialState, action = {}) => {

    if (action.type === LOGIN_TYPES.REQUEST_LOGIN) {
        return {
            ...state,
            isLoading: true
        };
    }


    return state;
};
