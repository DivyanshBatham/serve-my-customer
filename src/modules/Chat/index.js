import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Box, Text, Flex } from '../../atoms';
import { Loader, FlexCard } from '../../components';
import { AuthContext } from '../../context/AuthContext';
// import SimpleBar from 'simplebar-react';
import { Message, Timestamp, MessageStatus } from './styles';
// import 'simplebar';
import 'simplebar/dist/simplebar.min.css';

class Chat extends Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const { companyId } = this.context.user;
        const { sessionId } = this.props.match.params;

        this.messagesListener =
            firestore.collection(`companies/${companyId}/sessions/${sessionId}/messages`).orderBy("timestamp")
                .onSnapshot((messages) => {
                    this.setState({
                        messages: messages.docs.map(message => ({
                            id: message.id,
                            ...message.data()
                        }))
                    })
                    this.scrollToBottom();

                }, (err) => {
                    console.log(err);
                });
    }

    componentWillUnmount() {
        this.messagesListener();
    }

    scrollToBottom = () => {
        if (this.state.messages)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        // this.messagesEnd.scrollIntoView();
    }


    render() {
        const { messages } = this.state;
        return (messages ? (
            <Box bg="white" borderRadius="0.5rem" mb="1rem" p="1rem 1rem 0rem 1rem"
                height="100%" overflowY="auto" flex='1'
            >
                {messages.map(message =>
                    <Flex flexDirection={message.author === 'employee' ? "row-reverse" : "row"} key={message.id}>
                        <Message>
                            <Text.span>{message.message}</Text.span>

                            <Flex.verticallyCenter justifyContent="flex-end">
                                <Timestamp>
                                    {
                                        message.author === 'employee' ?
                                            new Date(message.clientTimestamp.toDate()).toLocaleTimeString(undefined, { timeStyle: 'short', hour12: true })
                                            :
                                            new Date(message.timestamp.toDate()).toLocaleTimeString(undefined, { timeStyle: 'short', hour12: true })
                                    }
                                </Timestamp>
                                {
                                    message.author === 'employee' &&
                                    <MessageStatus>
                                        {
                                            message.timestamp ?
                                                <FontAwesomeIcon
                                                    icon="check-double"
                                                />
                                                :
                                                <FontAwesomeIcon
                                                    icon="clock"
                                                />
                                        }
                                    </MessageStatus>
                                }
                            </Flex.verticallyCenter>

                        </Message>
                    </Flex>
                )}
                <div style={{ float: "left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </Box>
        ) : (
                <FlexCard>
                    <Loader sizes={['1rem', '1.1rem', '1rem']} />
                </FlexCard>
            )
        );


        {/* // <SimpleBar style={{ maxHeight: '38vh' }}>
            //     <Box bg="red">
            //         {messages && messages.map(message =>
            //             <Text key={message.id} text-align={message.author === 'employee' ? 'right' : 'left'}>{message.message}</Text>
            //         )}

            //         <div style={{ float: "left", clear: "both" }}
            //             ref={(el) => { this.messagesEnd = el; }}>
            //         </div>
            //     </Box>
            // </SimpleBar>
                </> */}
    }
}

export default withRouter(Chat);