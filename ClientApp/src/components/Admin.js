import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Admin';
import Login from './Login';
import Register from './Register';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.props.isAdmin();
        this.state = {
            authTab: "Sign up"
        }
    }

    render() {
        console.log( ' PROPS : ', this.props, this.props.isLoading , this.props.isAuthenticated );

        if ( this.props.isLoading ) {
            return <div> is loading </div>
        }

        if ( !this.props.isLoading && !this.props.isAuthenticated ) {
            return this.getRigistration();
        }

        return (
            <div>

                Admin panel

            </div>
        )
    }

    getRigistration = () => {
        return (
            <div>
                <input type="button"
                       className='btn btn-primary'
                       value="Sign up"
                       disabled={this.state.authTab == "Sign up"}
                       onClick={() => this.changeAuthTab("Sign up")} />
                <input type="button"
                       className='btn btn-primary'
                       value="Sign in"
                       disabled={this.state.authTab == "Sign in"}
                       onClick={() => this.changeAuthTab("Sign in")} />
                <div>
                    {  this.state.authTab == "Sign up" ? <Login /> : <Register /> }
                </div>
            </div>
        )
    }

    changeAuthTab = (authTab) => {
        this.setState({
            authTab
        })
    }
}

export default connect(
    state => state.admin,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Admin);
