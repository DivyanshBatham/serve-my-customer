import React from 'react';

import { Box } from '../../atoms';

const Chat = (props) => {
    return (
        // <Box maxHeight={'94vh'} overflowY="scroll" m="1.5rem 0" bg="white" borderRadius="0.5rem" flex="1">
        <Box maxHeight={'50vh'} m="1.5rem 0" bg="white" borderRadius="0.5rem" flex="1" {...props}>
            <h1>Chat</h1>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1>Chat</h1>
        </Box>
    );
}

export default Chat;