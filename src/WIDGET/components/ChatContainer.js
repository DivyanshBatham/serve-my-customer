
import styled from 'styled-components';
import { space } from 'styled-system'

const ChatContainer = styled.div`
    ${space}
    /* background-color: ${props => props.theme.colors.secondaryBackground}; */
    /* padding: 1rem; */
    /* border-radius: 8px; */
    /* box-shadow: ${props => props.theme.shadows.hover}; */
    position: absolute;
    top: 0;
    left: calc(100% + 2rem);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    > div {
        box-shadow: ${props => props.theme.shadows.hover};
    }
`;

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;