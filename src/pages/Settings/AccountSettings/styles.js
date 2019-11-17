
import styled from 'styled-components';
import { Text } from '../../../atoms';

export const ErrorText = styled(Text)`
    color: ${props => props.theme.colors.primaryText};
    text-align: right;
    font-size: 0.9rem;
    font-weight: medium;
    margin-bottom: 1rem;
    font-weight: ${props => props.theme.fontWeights.medium};
`