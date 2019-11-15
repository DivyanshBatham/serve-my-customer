import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './globalStyles';
import './fontawesome-lib';
import AuthContextProvider from './context/AuthContext';
import DynamicThemeProvider from './context/ThemeContext';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
// import './WIDGET/index';

ReactDOM.render(
    <AuthContextProvider>
        <DynamicThemeProvider>
            <GlobalStyle />
            <ReactNotification />
            <Routes />
        </DynamicThemeProvider>
    </AuthContextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
