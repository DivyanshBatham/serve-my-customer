import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from 'styled-components'
import theme from '../theme';

import WidgetApp from './WidgetApp';
import './fontawesome-lib-widget';

// Getting body:
const body = document.querySelector('body');

// Creating Serve-My-Customer target:
const servemycustomer = document.createElement('div');
servemycustomer.className = "serve-my-customer";

// Appending Serve-My-Customer target to Body:
body.appendChild(servemycustomer);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <WidgetApp />
    </ThemeProvider>,
    servemycustomer
);

