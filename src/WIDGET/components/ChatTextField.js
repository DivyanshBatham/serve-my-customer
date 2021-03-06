import styled from 'styled-components';

import TextField from './TextField';

const ChatTextField = styled(TextField)`
    color: ${props => props.theme.colors.primaryText}; 
    background-color: ${props => props.theme.colors.secondaryBackground};
    box-shadow: ${props => props.theme.shadows.hover};
    margin-top: 1rem;
    margin-bottom: 0rem;

    ::placeholder {
        color: ${props => props.theme.colors.secondaryText}; 
    }
`

export default ChatTextField;