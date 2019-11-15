import styled from 'styled-components';
import { Box, Flex } from '../../atoms';

export const StyledLink = styled.div`
    text-decoration: none;
    background-color: ${props => props.theme.colors.secondaryBackground};
    padding: 0.7rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: ${props => props.theme.shadows.normal};
    transition: ${props => props.theme.transition}, color 0s;
    color: ${props => props.theme.colors.primaryText};
    cursor: pointer;
    margin-bottom: 1.7rem;
    min-width: 200px;
    position: relative;
    overflow: hidden;

    &.active {
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.tertiaryText};
    }

    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
    }
`

export const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    position:sticky;
    top:1.7rem;
    align-self: start;
`

export const SettingsContainer = styled(Box)`
    flex: 1;
    background-color: ${props => props.theme.colors.secondaryBackground};
    margin-left: 2rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    align-self: start;
    position: relative;
`

export const Controls = styled(Flex)`
    justify-content: flex-end;
    position: absolute;
    right: 0;
    top: -4rem;
`