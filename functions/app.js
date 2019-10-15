const express = require('express');

const { indexRouter, registerRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/register', registerRouter);

module.exports = app;