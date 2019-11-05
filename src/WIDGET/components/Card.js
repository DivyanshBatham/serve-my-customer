
import styled from 'styled-components';
import { space } from 'styled-system'

const Card = styled.div`
    ${space}
    background-color: ${props => props.theme.colors.white};
    padding: 1rem;
    border-radius: 8px;
    box-shadow: ${props => props.theme.shadows.hover};
`;

Card.displayName = 'Card';

export default Card;