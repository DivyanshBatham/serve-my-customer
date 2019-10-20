import styled from 'styled-components';
import { Row, IconContainer } from '../../atoms';

export const StyledRow = styled(Row)`
    background-color: white;
    border-radius: 0.5rem;
    padding: 0.7rem 1rem;
    justify-content: space-between;
`

export const StyledIconContainer = styled(IconContainer)`
    cursor: pointer;
    transition: ${props => props.theme.transition};
    &:hover {
        color: ${props => props.theme.colors.primary}
    }
`