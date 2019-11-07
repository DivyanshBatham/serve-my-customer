import styled from 'styled-components';
import {
  color,
  space,
  typography,
  flexbox,
  layout
} from 'styled-system';

const Text = styled.div`
  ${color}
  ${space}
  ${typography}
  ${flexbox}
  ${layout}
`;

Text.displayName = 'Text';

Text.span = Text.withComponent('span');
Text.p = Text.withComponent('p');
Text.bold = Text.withComponent('strong');
Text.italics = Text.withComponent('em');

export default Text;
