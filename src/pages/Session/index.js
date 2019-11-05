import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import firebase, { firestore } from '../../config/clientSdk';
import { Flex, Button, IconContainer, Text, Column, Box, TextField } from '../../atoms';
import { StyledRow } from './styles';
import { Chat } from '../../modules';
import { Loader, FlexCard } from '../../components';
import 'simplebar';
import 'simplebar/dist/simplebar.min.css';

class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            sessionExists: true,
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
                        sessionExists: session.exists,
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
        const { message, session } = this.state;
        const { uid } = this.props.user;

        if (message && session.status !== 'pending' && session.status !== 'completed' && session.employeeId === uid) {
            const { companyId } = this.props.user;
            const { sessionId } = this.props.match.params;

            firestore.collection(`companies/${companyId}/sessions/${sessionId}/messages`).doc().set({
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                clientTimestamp: new Date(),
                sender: 'employee'
            })

            this.setState({
                message: ''
            })
        }
    }

    startSession = () => {
        const { companyId, uid } = this.props.user;
        const { sessionId } = this.props.match.params;

        firestore.doc(`companies/${companyId}/sessions/${sessionId}`).update({
            status: 'active',
            employeeId: uid,
            employeeRef: `companies/${companyId}/employees/${uid}`,
            startTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch(err => console.error("Error updating document: ", err))
    }

    endSession = () => {
        const { companyId, uid } = this.props.user;
        const { sessionId } = this.props.match.params;
        const { session } = this.state;

        if (session.employeeId === uid)
            firestore.doc(`companies/${companyId}/sessions/${sessionId}`).update({
                status: 'completed',
                employeeId: uid,
                employeeRef: `companies/${companyId}/employees/${uid}`,
                endTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }).catch(err => console.error("Error updating document: ", err))
    }

    renderButton = () => {
        const { session } = this.state;
        const { uid } = this.props.user;

        switch (session.status) {
            case 'pending':
                return (
                    <Button onClick={this.startSession}>
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
                return (session.employeeId === uid ? (
                    <Button.secondary onClick={this.endSession}>
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
                ) : (
                        null
                    ));

            default:
                return null;
        }
    }

    render() {
        const { sessionId } = this.props.match.params;
        const { session, message, sessionExists } = this.state;
        const { uid, companyId } = this.props.user;

        if (session && sessionExists) {
            return (
                <Column minHeight="100%" maxHeight="70vh">
                    <Flex.spaceBetween>
                        <h1>Session {sessionId}</h1>
                        {this.renderButton()}
                    </Flex.spaceBetween>

                    <StyledRow m="1rem 0" key={session.id}>
                        <Flex.verticallyCenter>
                            <Text mr="2rem">{session.customerName}</Text>
                            <Text.italics mr="2rem">{session.customerEmail}</Text.italics>
                            <Text>Subject: {session.subject}</Text>
                        </Flex.verticallyCenter>
                    </StyledRow>

                    <Chat
                        sessionId={sessionId}
                        companyId={companyId}
                        sender="employee"
                    // data-simplebar
                    // sessionId={sessionId}
                    // data-simplebar-auto-hide="false" 
                    />

                    {/* TODO: Move this to a separate component to reduce the lag of onChange */}
                    <TextField
                        type="text"
                        placeholder="Type a message"
                        name="message"
                        value={message}
                        autoComplete="off"
                        disabled={!(session && session.status !== 'pending' && session.status !== 'completed' && session.employeeId === uid)}
                        onChange={this.handleChange}
                        onKeyPress={this.sendMessageIfEnter}
                    />
                </Column>
            );
        } else {
            return (session && !sessionExists ? (
                <Column minHeight="100%">
                    <FlexCard>
                        <Text.span fontSize="2.1rem" fontWeight="medium">404</Text.span>
                        <Text.span fontSize="1.1rem">Session Not Found</Text.span>
                    </FlexCard>
                </Column>
            ) : (
                    <Column minHeight="100%">
                        <FlexCard>
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />
                        </FlexCard>
                    </Column>
                )
            );
        }
    }
}

export default Session;