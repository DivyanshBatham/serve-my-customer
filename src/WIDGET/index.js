import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import baseTheme from '../theme';
import GlobalStyle from './globalStyles';
import { expandTheme, fetchUserTheme } from '../helpers';

import WidgetApp from './WidgetApp';

const companyId = "<<<companyId>>>";

fetchUserTheme(companyId).then(userTheme => {
    const theme = expandTheme(baseTheme, userTheme);

    // Getting body:
    const body = document.querySelector('body');
    
    // Creating Serve-My-Customer target:
    const servemycustomer = document.createElement('div');
    servemycustomer.className = "serve-my-customer";
    
    // Appending Serve-My-Customer target to Body:
    body.appendChild(servemycustomer);
    
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <WidgetApp companyId={companyId}/>
        </ThemeProvider>,
        servemycustomer
    );

});


