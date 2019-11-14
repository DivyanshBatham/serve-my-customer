import styled from 'styled-components';
import {
  border,
  color,
  space,
  typography,
  layout,
} from 'styled-system';

const Button = styled.button`
  ${color}
  ${border}
  ${space}
  ${typography}
  ${layout}

  padding: 0.7rem 2.5rem;
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.shadows.normal};
  transition: ${props => props.theme.transition};
  font-family: ${props => props.theme.fonts.poppins};
  font-weight: ${props => props.theme.fontWeights.medium};
  color: ${props => props.theme.colors.tertiaryText};
  background-color: ${props => props.theme.colors.primary};
  border: none;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.2;
  }

  &:hover, &:focus {
    box-shadow: ${props => props.theme.shadows.hover};
  }

  &:focus {
    outline: none;
  }
`;

Button.displayName = 'Button';

Button.secondary = styled(Button)`
  background-color: ${props => props.theme.colors.secondaryBackground};
  color: ${props => props.theme.colors.primaryText};
`

export default Button;
