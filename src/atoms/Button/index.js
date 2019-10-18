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

  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 25px 0 rgba(46,61,73,.2);
  transition: all .3s ease;
  font-family: ${props => props.theme.fonts.poppins};
  font-weight: ${props => props.theme.fontWeights.medium};
  cursor: pointer;

  &:disabled {
    opacity: 0.2;
  }

  &:hover {
    box-shadow: 2px 4px 8px 0 rgba(46,61,73,.2);
  }

  &:focus {
    outline: none;
  }
`;

Button.defaultProps = {
  color: 'white',
  bg: 'primary',
  border: 'none',
  borderColor: 'primary',
  fontSize: '1rem',
};

Button.displayName = 'Button';

export default Button;
