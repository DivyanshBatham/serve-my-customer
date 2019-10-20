import styled from 'styled-components';

import { Box, Flex, Text } from '../../atoms';

export const StyledCard = styled(Box)`
    background-color: white;
    height: 140px;
    width: 180px;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin: 1rem;
    box-shadow: ${props => props.theme.shadows.normal};
    transition: ${props => props.theme.transition};
    font-family: ${props => props.theme.fonts.poppins};
    font-weight: ${props => props.theme.fontWeights.medium};
    cursor: pointer;

    &:hover {
        box-shadow: ${props => props.theme.shadows.hover};
        strong {
            color: ${props => props.theme.colors.primary};
        }
    }
`

export const StatNumber = styled(Text.bold)`
    text-align: right;
    align-self: flex-end;
    font-size: 4rem;
    color: "#484848";
    display: block;
    transition: ${props => props.theme.transition};
`