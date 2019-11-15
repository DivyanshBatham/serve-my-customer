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
import Heading from './components/Heading';
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
import Rating from './components/Rating';
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en-short'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import BackIcon from './components/BackIcon';

const formatter = buildFormatter(englishString)


class WidgetApp extends Component {
    constructor(props) {
        super(props);
        const servemycustomer = JSON.parse(localStorage.getItem('servemycustomer')) || {
            user: {},
            sessions: {}
        };
        // const currentSessionId = servemycustomer.user.currentSessionId;
        let currentSessionId = servemycustomer.user.currentSessionId;
        currentSessionId = currentSessionId && servemycustomer.sessions[currentSessionId].rating ? '' : currentSessionId;

        this.state = {
            showContainer: false,
            step: currentSessionId ? 2 : 1,
            ongoingSession: false,
            sessionId: currentSessionId || '',
            companyId: this.props.companyId,
            message: '',
            name: (servemycustomer.user && servemycustomer.user.name) || '',
            email: (servemycustomer.user && servemycustomer.user.email) || '',
            subject: (currentSessionId && servemycustomer.sessions[currentSessionId].subject) || '',
            servemycustomer: servemycustomer,
            userDetailsExists: servemycustomer.user && servemycustomer.user.name && servemycustomer.user.email,
        }
    }

    toggleContainer = () => {
        this.setState(prevState => ({
            showContainer: !prevState.showContainer
        }));
    }

    startSession = (e) => {
        e.preventDefault();
        const { companyId, name, email, subject, ongoingSession } = this.state;
        if (!ongoingSession) {
            if (name && email && subject) {
                this.setState({
                    ongoingSession: true, // Show loader in Button
                }, async () => {
                    try {
                        // Add Session Document to Firestore:
                        const sessionRef = await firestore.collection(`companies/${companyId}/sessions/`).add({
                            customerName: name,
                            customerEmail: email,
                            subject,
                            status: 'pending',
                            receivedTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        })

                        this.setSessionListener(sessionRef.id);


                    } catch (err) {
                        console.error(err);
                    }

                })
            }
        }
    }

    setSession = (sessionId, subject) => {
        this.setState({
            sessionId,
            // subjectDisplay: subject,
            step: 2,
        })
    }

    removeSession = () => {
        this.setState({
            step: 1,
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

    sendRating = (rating) => {
        const { sessionId, companyId, servemycustomer } = this.state;
        // Problem is that if the user hasn't rated curSEssion and opens prev Session, he can rate them.
        // if (this.sessionsListener)
        if (this.sessionsListener && servemycustomer.user.currentSessionId === sessionId)
            firestore.doc(`companies/${companyId}/sessions/${sessionId}`).update({
                rating: rating
            }).catch(err => console.error("Error rating the session: ", err))
    }

    setSessionListener = (sessionId) => {
        // If there is already a realtime session listener, terminate it:
        if (this.sessionsListener) {
            this.sessionsListener();
        }

        // Set a realtime listener for current session:
        const { companyId } = this.state;
        this.sessionsListener =
            firestore.doc(`companies/${companyId}/sessions/${sessionId}`)
                .onSnapshot((session) => {
                    const { servemycustomer } = this.state;

                    // FOR TESTING WITH DASHBOARD:
                    // if (!session.metadata.hasPendingWrites) { 
                    const { status, subject, receivedTimestamp, customerName, customerEmail, rating } = session.data()
                    // Update localStorage & state about the change in status:
                    let servemycustomerUpdated = { ...servemycustomer };

                    servemycustomerUpdated = {
                        user: {
                            name: customerName,
                            email: customerEmail,
                            // currentSessionId: rating ? null : sessionId, // Maybe I can change this.
                            currentSessionId: sessionId,
                        },
                        sessions: {
                            ...servemycustomer.sessions,
                            [sessionId]: {
                                status,
                                subject,
                                receivedTimestamp: receivedTimestamp.toDate(),
                                rating,
                            }
                        }
                    };

                    localStorage.setItem('servemycustomer', JSON.stringify(servemycustomerUpdated));

                    this.setState({
                        servemycustomer: servemycustomerUpdated,
                        step: 2,
                        sessionId: sessionId,
                        ongoingSession: status !== 'completed',
                        subject: '',
                        // subjectDisplay: subject,
                    });
                    // }

                }, (err) => {
                    console.log(err);
                });
    }

    componentDidMount() {
        // currentSessionId = currentSessionId && servemycustomer.sessions[currentSessionId].rating ? '' : currentSessionId;

        const { servemycustomer, userDetailsExists } = this.state;
        let currentSessionId = servemycustomer.user.currentSessionId;
        // if (userDetailsExists && servemycustomer.user.currentSessionId)
        if (userDetailsExists && currentSessionId && !servemycustomer.sessions[currentSessionId].rating)
            this.setSessionListener(currentSessionId);
        else {
            let servemycustomerUpdated = { ...servemycustomer };
            servemycustomerUpdated.user.currentSessionId = null;
            localStorage.setItem('servemycustomer', JSON.stringify(servemycustomerUpdated));
        }
    }

    componentWillUnmount() {
        this.sessionsListener();
    }

    render() {
        const {
            showContainer,
            step,
            sessionId,
            companyId,
            ongoingSession,
            message,
            name,
            email,
            subject,
            servemycustomer,
            userDetailsExists
        } = this.state;

        return (
            <>
                {
                    showContainer &&
                    <FloatingContainer>
                        <Header>
                            {
                                // !servemycustomer.user.currentSessionId && // Forces user to rate.
                                sessionId && servemycustomer.sessions[sessionId].status === 'completed'
                                &&
                                // servemycustomer.sessions[sessionId].status !== 'completed' )&&
                                <BackIcon onClick={this.removeSession}>
                                    {/* <FontAwesomeIcon color="white"
                                        icon="chevron-left"
                                    /> */}
                                    <svg height="32" width="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" className="svg-inline--fa fa-chevron-left fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg>
                                </BackIcon>
                            }
                            {/* TODO: servemycustomer.currentSessionId? 1: step*/}
                            {/* <Heading step={servemycustomer.user.currentSessionId ? 1 : step}> */}
                            <Heading step={sessionId && servemycustomer.sessions[sessionId].status !== 'completed' ? 1 : step}>
                                Serve My Customer
                            </Heading>
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
                                    {/* {!userDetailsExists && */}
                                    {!(servemycustomer.user && servemycustomer.user.name && servemycustomer.user.email) &&
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
                                            {ongoingSession ? (
                                                <Loader bg="tertiaryText" sizes={['0.6rem', '0.7rem', '0.6rem']} />
                                            ) : (
                                                    <Flex.verticallyCenter>
                                                        <IconContainer mr="0.5rem" ml="-0.5rem">
                                                            <svg height="24" width="24" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" className="svg-inline--fa fa-paper-plane fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path></svg>
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

                            {Object.entries(servemycustomer.sessions).length > 0 &&
                                <ConversationsContainer>
                                    <Text fontWeight="medium" mb="0.5rem">
                                        Your conversations
                                    </Text>
                                    {
                                        Object.keys(servemycustomer.sessions).reverse().map((sessionId, index) => (
                                            <React.Fragment key={sessionId}>
                                                {index > 0 && <Hr />}
                                                <Conversation
                                                    onClick={() => this.setSession(sessionId, servemycustomer.sessions[sessionId].subject)}
                                                    key={sessionId}
                                                >
                                                    <Subject>{servemycustomer.sessions[sessionId].subject}</Subject>
                                                    <Text ml="0.5rem" fontSize="0.8rem" color="secondaryText">
                                                        {<TimeAgo date={servemycustomer.sessions[sessionId].receivedTimestamp} formatter={formatter} />}
                                                    </Text>
                                                </Conversation>
                                            </React.Fragment>
                                        ))
                                    }
                                </ConversationsContainer>
                            }

                            <ChatContainer>
                                {sessionId && companyId &&
                                    <>
                                        <Card mb="1rem">
                                            <Subject>
                                                Sub: {servemycustomer.sessions[sessionId].subject}
                                            </Subject>
                                        </Card>
                                        <Chat
                                            sessionId={sessionId}
                                            companyId={companyId}
                                            sender="user"
                                        />
                                        {
                                            servemycustomer.sessions[sessionId].status !== 'completed' && (
                                                <ChatTextField
                                                    type="text"
                                                    placeholder="Type a message"
                                                    name="message"
                                                    value={message}
                                                    autoComplete="off"
                                                    // disabled={!(step === 2 && sessionId)}
                                                    // disabled={!(servemycustomer.sessions[sessionId] && servemycustomer.sessions[sessionId].status !== 'completed')}
                                                    onChange={this.handleChange}
                                                    onKeyPress={this.sendMessageIfEnter}
                                                />

                                            )}

                                        {
                                            servemycustomer.sessions[sessionId].status === 'completed'
                                            && servemycustomer.user.currentSessionId === sessionId
                                            && (
                                                <Card p="0.7rem 1rem" mt="1rem">
                                                    <Flex justifyContent="space-between">
                                                        <Text display="flex" alignItems="center" fontSize="0.9rem">How would you rate us?</Text>
                                                        <Flex flex="1" justifyContent="space-evenly">
                                                            <Rating
                                                                onClick={() => this.sendRating('happy')}
                                                                className={servemycustomer.sessions[sessionId].rating === 'happy' ? 'active' : 'null'}
                                                            >
                                                                <svg height="25.59" width="25.59" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="smile" className="svg-inline--fa fa-smile fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z"></path></svg>
                                                            </Rating>
                                                            <Rating
                                                                onClick={() => this.sendRating('neutral')}
                                                                className={servemycustomer.sessions[sessionId].rating === 'neutral' ? 'active' : null}
                                                            >
                                                                <svg height="25.59" width="25.59" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="meh" className="svg-inline--fa fa-meh fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm-80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm176 192H152c-21.2 0-21.2-32 0-32h192c21.2 0 21.2 32 0 32zm-16-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
                                                            </Rating>
                                                            <Rating
                                                                onClick={() => this.sendRating('sad')}
                                                                className={servemycustomer.sessions[sessionId].rating === 'sad' ? 'active' : null}
                                                            >
                                                                <svg height="25.59" width="25.59" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="frown" className="svg-inline--fa fa-frown fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm170.2 218.2C315.8 367.4 282.9 352 248 352s-67.8 15.4-90.2 42.2c-13.5 16.3-38.1-4.2-24.6-20.5C161.7 339.6 203.6 320 248 320s86.3 19.6 114.7 53.8c13.6 16.2-11 36.7-24.5 20.4z"></path></svg>
                                                            </Rating>
                                                        </Flex>
                                                    </Flex>
                                                </Card>
                                            )
                                        }
                                    </>
                                }

                            </ChatContainer>
                        </Step>

                    </FloatingContainer>
                }
                <FloatingButton onClick={this.toggleContainer}>
                    <IconContainer>
                        <svg height="21.59" width="19.19" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" className="svg-inline--fa fa-comments fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                    </IconContainer>
                </FloatingButton>


            </>
        );
    }
}

export default WidgetApp;
