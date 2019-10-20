import styled from 'styled-components';
import Flex from '../Flex';

import {
    layout,
    space,
    typography

} from 'styled-system';


const IconContainer = styled(Flex.center)`
    height: 24px;
    width: 24px;
    ${layout};
    ${space};
    ${typography}
`;

IconContainer.displayName = 'IconContainer';

export default IconContainer;
