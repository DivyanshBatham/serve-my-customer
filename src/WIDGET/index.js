import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'
import themes from '../theme/index';
import GlobalStyle from './globalStyles';
import { expandTheme, fetchUserTheme } from '../helpers';

import WidgetApp from './WidgetApp';

const companyId = "<<<companyId>>>";
const defaultThemeName = "classicBlue"; // Default Theme

fetchUserTheme(companyId)
    .then(({ currentTheme, userTheme, userThemeBase }) => {
        let theme;
        if (currentTheme) {
            if (currentTheme === 'userTheme') {
                theme = expandTheme(themes[userThemeBase], userTheme);
            } else {
                theme = themes[currentTheme];
            }
        } else {
            theme = themes[defaultThemeName];
        }

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
                <WidgetApp companyId={companyId} />
            </ThemeProvider>,
            servemycustomer
        );

    });


