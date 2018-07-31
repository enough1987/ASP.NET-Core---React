import React, { Component } from 'react';
import FormErrors from './FormErrors';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                password: '',
                confirm_password: ''
            },
            formErrors: {email: '', password: '', confirm_password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    render() {
        console.log( ' PROPS : ', this.props );

        return (
            <div>

                <form className='demoForm'>
                    <div className='form-group'>
                        <label htmlFor='email'>Email address</label>
                        <input type='email'
                               className='form-control'
                               name='email'
                               value={this.state.user.email}
                               onChange={this.handleUserInput} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password'
                               className='form-control'
                               name='password'
                               value={this.state.user.password}
                               onChange={this.handleUserInput} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='confirm_password'>Confirm Password</label>
                        <input type='password'
                               className='form-control'
                               name='confirm_password'
                               value={this.state.user.confirm_password}
                               onChange={this.handleUserInput} />
                    </div>

                    <FormErrors formErrors={this.state.formErrors} />

                    <input
                        type="button"
                        className='btn btn-primary'
                        onClick={this.handleSubmit}
                        disabled={!this.state.formValid}
                        value="Sign up"
                    />
                </form>

            </div>
        );
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value);
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        }, () => { this.validateField(name, value) });
    }

    handleSubmit = () => {
        if ( this.state.user.password !== this.state.user.confirm_password ) {
            return;
        }
        this.props.register(this.state.user);
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password && confirm_password':
                passwordValid = value.length >= 5;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }

        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm = () => {
        this.setState({formValid: this.state.emailValid &&
            this.state.passwordValid});
        console.log(this.state);
    }

}

export default Register;
