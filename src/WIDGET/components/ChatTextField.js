import styled from 'styled-components';

import TextField from './TextField';

const ChatTextField = styled(TextField)`
    background-color: ${props => props.theme.colors.white};
    box-shadow: ${props => props.theme.shadows.hover};
`

export default ChatTextField;