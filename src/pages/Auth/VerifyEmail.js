import React, { Component } from 'react';
import { auth } from '../../config/clientSdk';
import { Text, Flex, Box, Button } from '../../atoms';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleUpdateEmail = async () => {
        alert("TODO: Add InputField");
        // const res = auth.currentUser.updateEmail("divyansh.sunita@gmail");
        // auth.currentUser.sendEmailVerification();
        // console.log(res);
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
            <Flex.center flexDirection="column" flex="1">
                <h1>Email Not Verified</h1>
                <Text.p>Verify your email to start serving your customers.</Text.p>
                <Box>
                    <strong>Email: </strong>
                    <em>{user.email} (verified: {(user.emailVerified).toString()})</em>
                </Box>
                <Box>
                    <strong>User Id: </strong>
                    <em>{user.uid}</em>
                </Box>
                <Box mt="2rem">
                    <Button.secondary m="1rem" onClick={this.handleResendEmail}>Resend Email</Button.secondary>
                    <Button.secondary m="1rem" onClick={this.handleUpdateEmail}>Update Email</Button.secondary>
                </Box>
            </Flex.center>
        );
    }
}

export default VerifyEmail;