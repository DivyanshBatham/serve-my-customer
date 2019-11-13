import styled from 'styled-components';
import { Box } from '../../atoms';

export const Swatch = styled(Box)`
    display: inline-block;
    position: relative;
`

export const Color = styled(Box)`
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    background: ${props => props.theme.colors[props.color]};
    cursor: pointer;
`