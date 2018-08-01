import React, { Component } from 'react';
import {connect} from 'react-redux';

class UserList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log( ' PROPS : ', this.props );

        return (
            <div>
                { this.props.users.map((user) => {
                    return <p key={ user.Id }> Email : { user.Email } , Password : { user.Password } , Role : { user.Role } </p>
                }) }
            </div>
        );
    }

}

export default connect(
    state => state.dashboard,
    null
)(UserList);