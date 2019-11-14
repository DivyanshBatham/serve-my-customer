import styled from 'styled-components';
import {
  color,
  space,
  typography,
  layout
} from 'styled-system';

const TextField = styled.input`
  ${color}
  ${space}
  ${typography}
  ${layout}

  box-sizing: border-box;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  border: none;
  box-shadow: ${props => props.theme.shadows.normal};
  transition: ${props => props.theme.transition}; 
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primaryText}; 
  background-color: ${props => props.theme.colors.secondaryBackground}; 

  ::placeholder {
    color: ${props => props.theme.colors.lightBlack}; 
  }

  &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline: none;
  }
`;

export default TextField;
