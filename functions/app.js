const express = require('express');

const { indexRouter, registerRouter } = require('./routes');

const app = express();
console.log(process.env.FIREBASE_CONFIG);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/register', registerRouter);

module.exports = app;