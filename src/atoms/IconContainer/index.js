import styled from 'styled-components';
import Flex from '../Flex';

import {
    layout,
    space
} from 'styled-system';


const IconContainer = styled(Flex.center)`
    ${layout};
    ${space};
    height: 24px;
    width: 24px;
`;

IconContainer.displayName = 'IconContainer';

export default IconContainer;
