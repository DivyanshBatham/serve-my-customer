import styled from 'styled-components';
import { Row, IconContainer, Box, Text } from '../../atoms';
import { flexbox } from 'styled-system';

export const StyledCard = styled(Box)`
    background-color: white;
    height: 140px;
    width: 180px;
    border-radius: 0.5rem;
    position: relative;
    padding: 1.5rem;
    margin: 1rem;
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
            transition: ${props => props.theme.transition};
            color: ${props => props.theme.colors.primary};
        }
    }
    &.active {
        color: white;
        background-color: ${props => props.theme.colors.primary};

        strong {
            color: white;
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
`

export const StyledRow = styled(Row)`
    background-color: white;
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
