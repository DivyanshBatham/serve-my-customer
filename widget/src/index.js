import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const companyId = "<<<CompanyId>>>";

// Getting body:
const body = document.querySelector('body');

// Creating Serve-My-Customer target:
const servemycustomer = document.createElement('div');

// Appending Serve-My-Customer target to Body:
body.appendChild(servemycustomer);

ReactDOM.render(<App />, servemycustomer);

