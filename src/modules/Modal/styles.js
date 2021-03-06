import styled from 'styled-components';
import ReactModal from 'react-modal';

import { Box, IconContainer } from '../../atoms';

export const StyledReactModal = styled(ReactModal)`
    position: fixed;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    outline: none;

    padding: 1.5rem;
    background: ${props => props.theme.colors.primaryBackground};
    border-radius: 0.5rem;
    box-shadow: ${props => props.theme.shadows.normal};
    overflow: hidden;
    
`

export const ModalHeader = styled(Box)`
  background: ${props => props.theme.colors.primary};
  margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  padding: 1.5rem;
`;


export const StyledIconContainer = styled(IconContainer)`
    cursor: pointer;
    /* TODO: This variable should be changed: */
    color: ${props => props.theme.colors.tertiaryText};
    transition: ${props => props.theme.transition};
    height: 1.1rem;
    width: 1.1rem;
    font-size: 1.1rem;
    &:hover {
        color: ${props => props.theme.colors.tertiaryText}
    }
`
