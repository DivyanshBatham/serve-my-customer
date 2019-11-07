import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Box, Text, Flex } from '../../atoms';
import { Loader, FlexCard } from '../../components';
// import SimpleBar from 'simplebar-react';
import { Message, Timestamp, MessageStatus } from './styles';
// import 'simplebar';
// import 'simplebar/dist/simplebar.min.css';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const { sessionId, companyId } = this.props;

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
        if (this.state.messages && this.props.sessionId && this.props.companyId)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        // this.messagesEnd.scrollIntoView();
    }


    render() {
        const { messages } = this.state;
        const { sessionId, companyId, sender } = this.props;

        return (sessionId && companyId && messages ? (
            <Box bg="white" borderRadius="0.5rem" mb="1rem" p="1rem 1rem 0rem 1rem"
                height="100%" overflowY="auto" flex='1'
            >
                {messages.map(message =>
                    <Flex flexDirection={message.sender === sender ? "row-reverse" : "row"} key={message.id}>
                        <Message>
                            <Text.span>{message.message}</Text.span>

                            <Flex.verticallyCenter justifyContent="flex-end">
                                <Timestamp>
                                    {
                                        message.sender === sender ?
                                            new Date(message.clientTimestamp.toDate()).toLocaleTimeString(undefined, { timeStyle: 'short', hour12: true })
                                            :
                                            new Date(message.timestamp.toDate()).toLocaleTimeString(undefined, { timeStyle: 'short', hour12: true })
                                    }
                                </Timestamp>
                                {
                                    message.sender === sender &&
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
                <FlexCard mb="1rem">
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

export default Chat;