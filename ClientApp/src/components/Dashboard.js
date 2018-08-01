import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Dashboard';
import Login from './Login';
import Register from './Register';
import UserList from './UserList';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authTab: "Sign in"
        }
    }

    render() {
        console.log( ' PROPS : ', this.props, this.props.isLoading , this.props.isAuthenticated );

        return (
            <div>

                <div style={{display: this.props.isLoading ? 'block' : 'none' }}>
                    <div> is loading </div>
                </div>

                <div style={{display: !this.props.isLoading && !this.props.isAuthenticated ? 'block' : 'none' }}>
                    { this.getRigistration() }
                </div>

                <div style={{display: !this.props.isLoading && this.props.isAuthenticated ? 'block' : 'none' }}>
                    { this.getAdminPanel() }
                </div>

            </div>
        )
    }

    getRigistration = () => {
        return (
            <div>
                <input type="button"
                       className='btn btn-primary'
                       value="Sign in"
                       disabled={this.state.authTab === "Sign in"}
                       onClick={() => this.changeAuthTab("Sign in")} />
                <input type="button"
                       className='btn btn-primary'
                       value="Sign up"
                       disabled={this.state.authTab === "Sign up"}
                       onClick={() => this.changeAuthTab("Sign up")} />
                <div>
                    {  this.state.authTab === "Sign up"
                        ? <Register register={this.props.register} />
                        : <Login login={this.props.login} users={this.props.users} getAllUsers={this.props.getAllUsers} />
                    }
                </div>
            </div>
        )
    }

    getAdminPanel = () => {
        return (
            <div>

                <div style={{display: this.props.user.Role === 'Admin' ? 'block' : 'none' }}>
                    <p>
                        Admin dashboard panel
                    </p>

                    { this.getLogout() }

                    <UserList />
                </div>

                <div style={{display: this.props.user.Role === 'User' ? 'block' : 'none' }}>
                    <p>
                        User dashboard panel
                    </p>

                    { this.getLogout() }
                </div>

            </div>
        )
    }

    getLogout = () => {
        return (
            <div>
                <input type="button"
                       className='btn btn-primary'
                       value="Logout"
                       onClick={() => this.logout()} />
            </div>
        )
    }

    logout = () => {
        this.props.logout();
    }

    changeAuthTab = (authTab) => {
        this.setState({
            authTab
        })
    }
}

export default connect(
    state => state.dashboard,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Dashboard);
