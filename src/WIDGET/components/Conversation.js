import styled from 'styled-components';

const Conversation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    margin: 0 -1rem;
    padding: 0.5rem 1rem;
    transition: ${props => props.theme.transition}; 
    &:hover {
        background-color: ${props => props.theme.colors.background};
    }
`;

Conversation.displayName = 'Conversation';

export default Conversation;