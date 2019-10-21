import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Container, Flex, Button, IconContainer, Text, Column, Box, TextField } from '../../atoms';
import { StyledRow } from './styles';
import { Chat } from '../../modules';
import { Loader } from '../../components';
import 'simplebar';
import 'simplebar/dist/simplebar.min.css';

class Session extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /sessions/{sessionId} 📝
        let companyId = 'HLt6Aw07YQljGsU3Jg7x';
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
        const { session } = this.state;

        return (
            <Column>
                <Flex.spaceBetween>
                    <h1>Session {sessionId}</h1>
                    {session && this.renderButton(session.sessionStatus)}
                </Flex.spaceBetween>

                {
                    session ? (
                        <StyledRow m="1rem 0" key={session.id}>
                            <Flex.verticallyCenter>
                                <Text mr="2rem">{session.customerName}</Text>
                                <Text.italics mr="2rem">{session.customerEmail}</Text.italics>
                                <Text>Subject: {session.sessionSubject}</Text>
                            </Flex.verticallyCenter>
                        </StyledRow>
                    ) : (
                            <StyledRow justifyContent="center" m="1rem 0">
                                <Loader sizes={['0.8rem', '0.9rem', '0.8rem']} />
                            </StyledRow>
                        )
                }

                <Flex>
                    <Chat data-simplebar
                    // data-simplebar-auto-hide="false" 
                    />
                    {/* <Box data-simplebar m="1.5rem 0 1.5rem 1.5rem" bg="white" borderRadius="0.5rem" width="250px">
                        Suggestions
                    </Box> */}
                </Flex>

                <TextField type="text" placeholder="Type a message" />
            </Column>
        );
    }
}

export default Session;