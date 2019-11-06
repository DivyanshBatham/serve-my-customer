import React, { Component } from 'react';
import firebase, { firestore } from '../config/clientSdk';
import IconContainer from '../atoms/IconContainer';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Button from '../atoms/Button';
import { Loader } from '../components/Loaders';
import FloatingButton from './components/FloatingButton';
import FloatingContainer from './components/FloatingContainer';
import Header from './components/Header';
import Card from './components/Card';
import Step from './components/Step';
import Form from './components/Form';
import TextField from './components/TextField';
import ChatTextField from './components/ChatTextField';
import ChatContainer from './components/ChatContainer';
import Chat from '../modules/Chat';
import Conversation from './components/Conversation';
import ConversationsContainer from './components/ConversationsContainer';
import Hr from './components/Hr';
import Subject from './components/Subject';

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

class WidgetApp extends Component {
    constructor(props) {
        super(props);
        const servemycustomer = JSON.parse(localStorage.getItem('servemycustomer')) || {
            user: {},
            sessions: []
        };
        this.state = {
            showContainer: true,
            step: 1,
            startingSession: false,
            sessionId: '',
            companyId: '<<<CompanyId>>>',
            message: '',
            name: servemycustomer.user && (servemycustomer.user.name || ''),
            email: servemycustomer.user && (servemycustomer.user.email || ''),
            subject: '',
            servemycustomer: servemycustomer
        }
    }

    toggleContainer = () => {
        this.setState(prevState => ({
            showContainer: !prevState.showContainer
        }));
    }

    startSession = (e) => {
        e.preventDefault();
        const { companyId, name, email, subject, servemycustomer } = this.state;
        if (name && email && subject) {
            this.setState({
                startingSession: true, // Show loader in Button
            }, async () => {
                try {
                    // Add Session Document to Firestore:
                    const sessionRef = await firestore.collection(`companies/${companyId}/sessions/`).add({
                        customerName: name,
                        customerEmail: email,
                        subject,
                        status: 'pending',
                        startTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })

                    const sessionDoc = await sessionRef.get();
                    const { status, startTimestamp } = sessionDoc.data();

                    let servemycustomerNewSession = servemycustomer;
                    servemycustomerNewSession = {
                        user: {
                            name,
                            email
                        },
                        sessions: [
                            {
                                id: sessionRef.id,
                                subject,
                                startTimestamp: startTimestamp.toDate().getTime(),
                                status

                            },
                            ...servemycustomer.sessions
                        ]
                    };

                    localStorage.setItem('servemycustomer', JSON.stringify(servemycustomerNewSession));


                    this.setState({
                        step: 2,
                        sessionId: sessionRef.id,
                    });

                } catch (err) {
                    console.error(err);
                }

            })
        }
    }

    setSession = (sessionId, subject) => {
        this.setState({
            sessionId,
            subject,
            step: 2,
        })
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
        const { message, step, sessionId, companyId } = this.state;

        if (message && step === 2 && sessionId && companyId) {
            firestore.collection(`companies/${companyId}/sessions/${sessionId}/messages`).doc().set({
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                clientTimestamp: new Date(),
                sender: 'user'
            })

            this.setState({
                message: ''
            })
        }
    }

    render() {
        const {
            showContainer,
            step,
            sessionId,
            companyId,
            startingSession,
            message,
            name,
            email,
            subject,
            servemycustomer
        } = this.state;
        return (
            <>
                {
                    showContainer &&
                    <FloatingContainer>
                        <Header>
                            <Text
                                color="white"
                                fontSize="2rem"
                                fontWeight="medium"
                                fontFamily="pacifico"
                                as="h1"
                            >
                                Serve My Customer
                        </Text>
                        </Header>

                        <Step mt="-3.5rem" step={step}>

                            <Card mb="1rem">
                                <Flex.verticallyCenter>
                                    <Text fontSize="2rem" mr="1rem">
                                        👋
                                    </Text>
                                    <div>
                                        <Text fontWeight="bold">
                                            We'r online and ready to help
                                        </Text>
                                        <Text>The team typically replies in few minutes.</Text>
                                    </div>
                                </Flex.verticallyCenter>
                            </Card>

                            <Card>
                                <Form onSubmit={this.startSession}>
                                    {!servemycustomer.user.name && !servemycustomer.user.email &&
                                        <>
                                            <TextField
                                                type="text"
                                                name="name"
                                                value={name}
                                                disabled={(step === 2 && sessionId && companyId)}
                                                onChange={this.handleChange}
                                                placeholder="Name"
                                            />
                                            <TextField
                                                type="text"
                                                name="email"
                                                value={email}
                                                disabled={(step === 2 && sessionId && companyId)}
                                                onChange={this.handleChange}
                                                placeholder="Email"
                                            />
                                        </>
                                    }
                                    <TextField
                                        type="text"
                                        name="subject"
                                        value={subject}
                                        disabled={(step === 2 && sessionId && companyId)}
                                        onChange={this.handleChange}
                                        placeholder="Subject"
                                    />
                                    <Flex justifyContent="flex-end">
                                        <Button type="submit" width="256px" mt="0.5rem">
                                            {startingSession ? (
                                                <Loader bg="white" sizes={['0.6rem', '0.7rem', '0.6rem']} />
                                            ) : (
                                                    <Flex.verticallyCenter>
                                                        <IconContainer mr="0.5rem" ml="-0.5rem">
                                                            <svg fill="white" height="16" width="16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" className="svg-inline--fa fa-paper-plane fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
                                                        </IconContainer>
                                                        <Text>
                                                            Start Conversation
                                                     </Text>
                                                    </Flex.verticallyCenter>
                                                )
                                            }

                                        </Button>
                                    </Flex>
                                </Form>
                            </Card>

                            {servemycustomer.user.name && servemycustomer.user.email && servemycustomer.sessions.length > 0 &&
                                <ConversationsContainer>
                                    <Text fontWeight="medium" mb="0.5rem">
                                        Your conversations
                                    </Text>

                                    <Conversation
                                        onClick={() => this.setSession(servemycustomer.sessions[0].id, servemycustomer.sessions[0].subject)}
                                        key={servemycustomer.sessions[0].id}
                                    >
                                        <Subject>{servemycustomer.sessions[0].subject}</Subject>
                                        <Text ml="0.5rem" fontSize="0.8rem" color="lightBlack">
                                            {timeAgo.format(servemycustomer.sessions[0].startTimestamp)}
                                        </Text>
                                    </Conversation>

                                    {servemycustomer.sessions.slice(1).map(session => (
                                        <React.Fragment key={session.id}>
                                            <Hr />
                                            <Conversation onClick={() => this.setSession(session.id, session.subject)} >
                                                <Subject>{session.subject}</Subject>
                                                <Text ml="0.5rem" fontSize="0.8rem" color="lightBlack">
                                                    {timeAgo.format(session.startTimestamp)}
                                                </Text>
                                            </Conversation>
                                        </React.Fragment>
                                    ))}
                                </ConversationsContainer>
                            }

                            <ChatContainer>
                                {step === 2 && sessionId && companyId &&
                                    <>
                                        <Card mb="1rem">
                                            <Subject>
                                                Sub: {subject}
                                            </Subject>
                                        </Card>
                                        <Chat
                                            sessionId={sessionId}
                                            companyId={companyId}
                                            sender="user"
                                        />
                                        <ChatTextField
                                            type="text"
                                            placeholder="Type a message"
                                            name="message"
                                            value={message}
                                            autoComplete="off"
                                            disabled={!(step === 2 && sessionId && companyId)}
                                            onChange={this.handleChange}
                                            onKeyPress={this.sendMessageIfEnter}
                                        />
                                    </>
                                }

                            </ChatContainer>
                        </Step>

                    </FloatingContainer>
                }
                <FloatingButton onClick={this.toggleContainer}>
                    <IconContainer>
                        <svg height="19.19" width="21.59" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" className="svg-inline--fa fa-comments fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                    </IconContainer>
                </FloatingButton>


            </>
        );
    }
}

export default WidgetApp;
