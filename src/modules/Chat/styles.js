import styled from 'styled-components';
import { Box, Text } from '../../atoms';

// import SimpleBar from 'simplebar-react';

// export const StyledSimpleBar = styled(SimpleBar)`
//     background-color: white;
//     flex: 1;
//     max-height: 38vh;
// `

export const Message = styled(Box)`
    background-color: rgba(52, 100, 224, 0.1);
    max-width: 80%;
    margin-bottom: 1rem;
    padding: 0.7rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
`

export const Timestamp = styled(Text.span)`
    font-size: 0.8rem;
    color: ${props => props.theme.colors.lightBlack};
`

export const MessageStatus = styled(Text.span)`
    font-size: 0.6rem;
    margin-left: 0.3rem;
    color: ${props => props.theme.colors.lightBlack};
`