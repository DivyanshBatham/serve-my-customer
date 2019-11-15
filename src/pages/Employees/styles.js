import styled from 'styled-components';
import { Row, IconContainer } from '../../atoms';
import { FlexCard } from '../../components';
import { flexbox } from 'styled-system';

export const StyledRow = styled(Row)`
    background-color: ${props => props.theme.colors.secondaryBackground};
    border-radius: 0.5rem;
    padding: 0.7rem 1rem;
    justify-content: space-between;
    ${flexbox};
`

export const StyledIconContainer = styled(IconContainer)`
    cursor: pointer;
    transition: ${props => props.theme.transition};
    &:hover {
        color: ${props => props.theme.colors.primary}
    }
`

export const StyledFlexCard = styled(FlexCard)`
    cursor: pointer;
    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
        > div:first-child {
            color: ${props => props.theme.colors.primary};
        }
    }
`