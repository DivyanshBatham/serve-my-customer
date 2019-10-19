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

  &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline: none;
  }
`;

export default TextField;
