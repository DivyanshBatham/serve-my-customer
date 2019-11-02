import styled from 'styled-components';
import {
  color,
  space,
  flex,
  layout,
  border,
} from 'styled-system';

const Box = styled.div`
  ${color}
  ${space}
  ${flex}
  ${layout}
  ${border}
  box-sizing: border-box;
`;

Box.displayName = 'Box';

export default Box;
