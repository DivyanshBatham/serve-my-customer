import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase, { firestore } from '../../config/clientSdk';
import { Flex, Button, IconContainer, Text, Column, Box, TextField } from '../../atoms';
import { StyledRow } from './styles';
import { Chat } from '../../modules';
import { Loader } from '../../components';
import 'simplebar';
import 'simplebar/dist/simplebar.min.css';

class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /sessions/{sessionId} 📝
        const { companyId } = this.props.user;
        const { sessionId } = this.props.match.params;

        this.sessionsListener =
            firestore.doc(`companies/${companyId}/sessions/${sessionId}`)
                .onSnapshot((session) => {
                    this.setState({
                        session: {
                            id: session.id,
                            ...session.data()
                        },
                    })
                }, (err) => {
                    console.log(err);
                });
    }

    componentWillUnmount() {
        this.sessionsListener();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendMessageIfEnter = (e) => {
        if (e.key === 'Enter')
            this.handleSendMessage();
    }

    handleSendMessage = () => {
        const { message } = this.state;

        if (message) {
            const { companyId } = this.props.user;
            const { sessionId } = this.props.match.params;

            firestore.collection(`companies/${companyId}/sessions/${sessionId}/messages`).doc().set({
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                clientTimestamp: new Date(),
                author: 'employee'
            })

            this.setState({
                message: ''
            })
        }

    }

    renderButton = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <Button>
                        <Flex>
                            <IconContainer mr="0.5rem" ml="-0.5rem">
                                <FontAwesomeIcon
                                    icon="comment-medical"
                                />
                            </IconContainer>
                            <Text>
                                Start Session
                            </Text>
                        </Flex>
                    </Button>
                )
            case 'active':
            case 'inactive':
                return (
                    <Button.secondary>
                        <Flex>
                            <IconContainer mr="0.5rem" ml="-0.5rem">
                                <FontAwesomeIcon
                                    icon="comment-slash"
                                />
                            </IconContainer>
                            <Text>
                                End Session
                            </Text>
                        </Flex>
                    </Button.secondary>
                )
            default:
                return null;
        }
    }

    render() {
        const { sessionId } = this.props.match.params;
        const { session, message } = this.state;

        return (
            // <Column minHeight="100%">
            <Column minHeight="100%" maxHeight="90vh">
                <Flex.spaceBetween>
                    <h1>Session {sessionId}</h1>
                    {session && this.renderButton(session.status)}
                </Flex.spaceBetween>

                {
                    session ? (
                        <StyledRow m="1rem 0" key={session.id}>
                            <Flex.verticallyCenter>
                                <Text mr="2rem">{session.customerName}</Text>
                                <Text.italics mr="2rem">{session.customerEmail}</Text.italics>
                                <Text>Subject: {session.subject}</Text>
                            </Flex.verticallyCenter>
                        </StyledRow>
                    ) : (
                            <StyledRow justifyContent="center" m="1rem 0">
                                <Loader sizes={['0.8rem', '0.9rem', '0.8rem']} />
                            </StyledRow>
                        )
                }

                    <Chat
                    // data-simplebar
                    // sessionId={sessionId}
                    // data-simplebar-auto-hide="false" 
                    />

                <TextField
                    type="text"
                    placeholder="Type a message"
                    name="message"
                    value={message}
                    onChange={this.handleChange}
                    onKeyPress={this.sendMessageIfEnter}
                />
            </Column>
        );
    }
}

export default Session;