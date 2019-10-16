import React, { Component } from 'react';
import { auth } from '../../config/clientSdk';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleUpdateEmail = async () => {
        const res = auth.currentUser.updateEmail("divyansh.sunita@gmail");

        console.log(res);
    }

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <div>
                <h1>VerifyEmail</h1>
                <strong>Email: </strong>
                <em>{user.email} (verified: {(user.emailVerified).toString()})</em>
                <br />
                <strong>User Id: </strong>
                <em>{user.uid}</em>
                <br />
                <button>Resend Email</button>
                <br />
                <button onClick={this.handleUpdateEmail}>Update Email</button>
            </div>
        );
    }
}

export default VerifyEmail;