import styled from 'styled-components';
import { TextField, Text } from '../../atoms';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
`;

export const AuthTextField = styled(TextField)`
    margin: 0.8rem 0;
`

export const AuthLink = styled(Text)`
    text-decoration: none;
    color: ${props => props.theme.colors.black};

    &:hover {
        text-decoration: underline
    }
`

export const ErrorText = styled(Text)`
    color: ${props => props.theme.colors.red};
    text-align: right;
    font-size: 0.9rem;
    font-weight: medium;
    font-weight: ${props => props.theme.fontWeights.medium};
`