import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../store/Dashboard';

class UserList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log( ' PROPS : ', this.props );

        return (
            <div>
                { this.props.users.map((user) => {
                    return <p key={ user.Id }>
                            <span> Email : { user.Email } </span> ,
                            <span> Password : { user.Password } </span> ,
                            <span> Role : { user.Role } </span> ,

                            <input type="button" value="delete"
                                   style={{display: this.props.user.Role === 'Admin' ? 'inline-block' : 'none' }}
                                   onClick={() => this.props.deleteUser(user.Id)} />
                        </p>
                }) }
            </div>
        );
    }

}

export default connect(
    state => state.dashboard,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(UserList);