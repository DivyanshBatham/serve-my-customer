import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components'
import theme from './theme';
import GlobalStyle from './globalStyles';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
