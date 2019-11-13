import styled from 'styled-components';
import { Box } from '../../../atoms';

export const ThemeCardContainer = styled(Box)`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 1.5rem;
    margin: 1.5rem;
`

export const ThemeCard = styled(Box)`
    color: ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.primary};
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.5rem;
    font-weight: ${props => props.theme.fontWeights.medium};
    color: white;
    /* box-shadow: ${props => props.theme.shadows.normal}; */
    transition: ${props => props.theme.transition}, color 0s;

    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
    }
`