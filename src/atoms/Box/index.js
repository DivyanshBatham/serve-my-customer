import styled from 'styled-components';
import {
  color,
  space,
  layout
} from 'styled-system';

const Box = styled.div`
  ${color}
  ${space}
  ${layout}
  box-sizing: 'border-box';
`;

Box.displayName = 'Box';

export default Box;
