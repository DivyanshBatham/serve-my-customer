import styled from 'styled-components';

import Card from './Card';

const ConversationsContainer = styled(Card)`
    margin-top: 1rem;
    max-height: 20vh;
    overflow-y: auto;
`;

ConversationsContainer.displayName = 'ConversationsContainer';

export default ConversationsContainer;