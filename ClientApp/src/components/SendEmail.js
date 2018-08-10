import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../store/Email';

class SendEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {
                toEmail: 'tilgaaleksandr@meta.ua',
                subject: 'subject text',
                body: 'body text'
            },
            formErrors: {toEmail: '', subject: '', body: ''},
            emailValid: true,
            subjectValid: true,
            bodyValid: true,
            formValid: true
        }
    }

    render() {
        console.log( ' PROPS Mail : ', this.props );

        return (
            <div>
                <p>
                    <span> To Email: </span>
                    <input type="text"
                           name='toEmail'
                           value={this.state.email.toEmail}
                           onChange={this.handleUserInput} />
                </p>
                <p>
                    <span> Subject: </span>
                    <input type="text"
                           name='subject'
                           value={this.state.email.subject}
                           onChange={this.handleUserInput} />
                </p>
                <p>
                    <span> Body: </span>
                    <input type="text"
                           name='body'
                           value={this.state.email.body}
                           onChange={this.handleUserInput}/>
                </p>

                <input type="button" value='Send'
                        disabled={!this.state.formValid}
                        onClick={this.sendEmail}/>

            </div>
        );
    }

    sendEmail = () => {
        console.log('STATE : ', this.state );
        this.props.sendEmail(this.state.email);
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, ' - ' , value);
        this.setState({
            email: {
                ...this.state.email,
                [name]: value
            }
        }, () => { this.validateField(name, value) });
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let subjectValid = this.state.subjectValid;
        let bodyValid = this.state.bodyValid;

        switch (fieldName) {
            case 'toEmail':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'subject':
                subjectValid = value.length >= 1;
                fieldValidationErrors.subject = subjectValid ? '' : ' is too short';
                break;
            case 'body':
                bodyValid = value.length >= 1;
                fieldValidationErrors.body = bodyValid ? '' : ' is too short';
                break;
            default:
                break;
        }
    }

}

export default connect(
    null,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SendEmail);