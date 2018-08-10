import axios from '../interceptors/interceptors';

const MAIL_TYPES = Object.freeze({
    SEND_MAIL : 'SEND_MAIL',
    SENDED_MAIL : 'SENDED_MAIL'

});


const initialState = {
    error: false,
    send: false,
    sended: false
};

export const actionCreators = {
    sendEmail: (email) => async (dispatch) => {

        console.log('EMAIL : ', email);

        dispatch({ type: MAIL_TYPES.SEND_MAIL });

        const url = `api/Emails/SendEmail`;

        const response = await axios.get(url, {
            params: {
                toEmail: email.toEmail,
                subject: email.subject,
                body: email.body
            }
        });

        console.log(response);

        //const item = response.data;

        //dispatch({ type: MAIL_TYPES.SENDED_MAIL, payload: true });

    }
};

export const reducer = (state = initialState, action = {}) => {

    if (action.type === MAIL_TYPES.SEND_MAIL) {
        return {
            ...state,
            error: false,
            send: true,
            sended: false
        };
    }

    if (action.type === MAIL_TYPES.SENDED_MAIL) {
        return {
            ...state,
            error: false,
            send: false,
            sended: action.payload
        };
    }

    return state;
};