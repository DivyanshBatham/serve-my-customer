import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components'
import theme from './theme';
import GlobalStyle from './globalStyles';
import './fontawesome-lib';
import AuthContextProvider from './context/AuthContext';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import './WIDGET/index';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ReactNotification />
        <AuthContextProvider>
            <Routes />
        </AuthContextProvider>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
