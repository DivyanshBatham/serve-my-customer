const express = require('express');
const cors = require('cors');

const { indexRouter, registerRouter, inviteEmployeeRouter } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/inviteEmployee', inviteEmployeeRouter);

module.exports = app;