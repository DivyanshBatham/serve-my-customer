import styled from 'styled-components';
import { flexbox, border, shadow } from 'styled-system';
import { Flex } from '../atoms';

const FlexCard = styled(Flex.center)`
    background-color: ${props => props.theme.colors.white};
    border-radius: 0.5rem;
    padding: 0.7rem 1rem;
    flex: 1;
    flex-direction: column;
    transition: ${props => props.theme.transition};
    ${flexbox};
    ${border};
    ${shadow};
`

FlexCard.displayName = 'FlexCard';

export default FlexCard;