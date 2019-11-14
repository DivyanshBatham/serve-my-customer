
import styled from 'styled-components';
import { space } from 'styled-system'

const Card = styled.div`
    background-color: ${props => props.theme.colors.secondaryBackground};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: ${props => props.theme.shadows.hover};
    ${space}
`;

Card.displayName = 'Card';

export default Card;