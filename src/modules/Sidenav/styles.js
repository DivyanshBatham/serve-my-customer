import styled from 'styled-components';
import {IconContainer, Flex } from '../../atoms';

export const StyledLink = styled(Flex.center)`
    text-decoration: none;
    background-color: ${props => props.theme.colors.secondaryBackground};
    flex-direction: column;
    display: inline-flex;
    height: 100px;
    width: 100px;
    font-size: 0.9rem;
    font-weight: ${props => props.theme.fontWeights.medium};
    border-radius: 0.5rem;
    box-shadow: ${props => props.theme.shadows.normal};
    transition: ${props => props.theme.transition}, color 0s;
    color: ${props => props.theme.colors.primaryText};
    cursor: pointer;
    margin-top: 1.7rem;

    &.active {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.tertiaryText};
    }

    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
    }
`
export const StyledIconContainer = styled(IconContainer)`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    /* color: red; */
`

export const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    /* justify-content:space-evenly;  */
    /* width:200px; */
    position:sticky;
    top:0;
    /* max-height: 80vh; */
    align-self: start;
    margin: 0 2.5rem;
`