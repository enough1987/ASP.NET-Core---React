import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Admin';
import Login from './Login';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.props.isAdmin();
    }

    render() {
        console.log( ' PROPS : ', this.props );

        if ( this.props.isLoading ) {
            return <div> is loading </div>
        }

        if ( !this.props.isAuthenticated ) {
            return <Login />
        }

        return (
            <div>

                Admin panel

            </div>
        );
    }
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Admin);
