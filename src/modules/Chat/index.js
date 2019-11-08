import React, { Component } from 'react';
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
        this.state = {
            loading: true,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.sessionId !== this.props.sessionId) {
            this.setMessageListener(true);
        }
    }

    componentDidMount() {
        this.setMessageListener()
    }

    componentWillUnmount() {
        this.messagesListener();
    }

    setMessageListener = () => {
        if (this.messagesListener) {
            this.messagesListener();
            this.setState({
                loading: true,
            })
        }

        const { sessionId, companyId } = this.props;

        this.messagesListener =
            firestore.collection(`companies/${companyId}/sessions/${sessionId}/messages`).orderBy("timestamp")
                .onSnapshot((messages) => {
                    this.setState({
                        messages: messages.docs.map(message => ({
                            id: message.id,
                            ...message.data()
                        })),
                        loading: false,
                    })
                    this.scrollToBottom();

                }, (err) => {
                    console.log(err);
                });
    }

    scrollToBottom = () => {
        if (this.state.messages && this.props.sessionId && this.props.companyId)
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        // this.messagesEnd.scrollIntoView();
    }


    render() {
        const { messages, loading } = this.state;
        const { sender } = this.props;

        return (!loading ? (
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
                                                <svg height="9.59" width="9.59" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-double" className="svg-inline--fa fa-check-double fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"></path></svg>
                                                :
                                                <svg height="9.59" width="9.59" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" className="svg-inline--fa fa-clock fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm57.1 350.1L224.9 294c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v137.7l63.5 46.2c5.4 3.9 6.5 11.4 2.6 16.8l-28.2 38.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>
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