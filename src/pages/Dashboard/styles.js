import styled from 'styled-components';

import { Box, Text } from '../../atoms';

export const StyledCard = styled(Box)`
    position: relative;
    background-color: white;
    height: 140px;
    width: 180px;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin: 1rem;
    box-sizing: content-box;
    box-shadow: ${props => props.theme.shadows.normal};
    transition: ${props => props.theme.transition};
    font-family: ${props => props.theme.fonts.poppins};
    font-weight: ${props => props.theme.fontWeights.medium};
    text-decoration: none;
    color: ${props => props.theme.colors.black};
    cursor: pointer;

    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
        strong {
            color: ${props => props.theme.colors.primary};
        }
    }
`

export const StyledCardNotifier = styled(Box)`
    height: 1rem;
    width: 1rem;
    position: absolute;
    border-radius: 100%;
    top: 1.5rem;
    right: 1.5rem;
`


export const StatNumber = styled(Text.bold)`
    text-align: right;
    align-self: flex-end;
    font-size: 4rem;
    color: "#484848";
    display: block;
    transition: ${props => props.theme.transition};
`