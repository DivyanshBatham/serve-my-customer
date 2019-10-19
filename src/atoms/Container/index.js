import React from 'react';
import styled from 'styled-components';

import Box from '../Box';
import { FullPageLoader } from '../../components';

const Container = styled(Box)`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;

@media (min-width: 576px) {
    max-width: 540px;
}

@media (min-width: 768px) {
    max-width: 720px;
}

@media (min-width: 992px) {
    max-width: 960px;
}

@media (min-width: 1200px) {
    max-width: 1140px;
}
`

Container.displayName = 'Container';

Container.Loader = (props) => {
    const { showLoader } = props;
    return showLoader ? <FullPageLoader /> : <Container>{props.children}</Container>;
}

Container.Loader.displayName = 'Container.Loader';

export default Container;