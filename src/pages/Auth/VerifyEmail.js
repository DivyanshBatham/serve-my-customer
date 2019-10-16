import React, { Component } from 'react';
import { auth } from '../../config/clientSdk';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleUpdateEmail = async () => {
        const res = auth.currentUser.updateEmail("divyansh.sunita@gmail");
        auth.currentUser.sendEmailVerification();
        console.log(res);
    }

    handleResendEmail = () => {
        auth.currentUser.sendEmailVerification()
            .then((res) => {
                console.log(res);
                alert("Email Sent")
            })
            .catch(err => {
                console.error(err);
            })
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
                <button onClick={this.handleResendEmail}>Resend Email</button>
                <br />
                <button onClick={this.handleUpdateEmail}>Update Email</button>
            </div>
        );
    }
}

export default VerifyEmail;