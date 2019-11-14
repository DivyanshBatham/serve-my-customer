import styled from 'styled-components';

const TextField = styled.input`
  box-sizing: border-box;
  padding: 0.7rem 1rem;
  border-radius: 0.5rem;
  border: none;
  color: ${props => props.theme.colors.primaryText};
  background-color: ${props => props.theme.colors.tertiaryBackground};
  transition: ${props => props.theme.transition}; 
  margin-bottom: 0.7rem;
  font-size: 0.9rem;

  ::placeholder {
    color: ${props => props.theme.colors.secondaryText}; 
  }
  
  &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
    outline: none;
  }
`;

export default TextField;
