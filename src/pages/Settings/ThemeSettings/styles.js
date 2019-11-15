import styled from 'styled-components';
import { Box } from '../../../atoms';

export const ThemeCardContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 2rem;
    margin: 2rem 1.5rem;
`

export const ThemeCard = styled(Box)`
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.5rem;
    font-weight: ${props => props.theme.fontWeights.medium};
    color: ${props => props.theme.colors.primaryText};
    box-shadow: ${props => props.theme.shadows.normal};
    background-color: ${props => props.theme.colors.tertiaryBackground};
    transition: ${props => props.theme.transition}, color 0s;

    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
    }

    &.active {
        background-color: ${props => props.theme.colors.primary};
        box-shadow: ${props => props.theme.shadows.hover};
        color: ${props => props.theme.colors.tertiaryText};
    }
`