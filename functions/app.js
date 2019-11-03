const express = require('express');
const cors = require('cors');

const {
    indexRouter,
    registerRouter,
    inviteEmployeeRouter,
    registerEmployeeRouter
} = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/inviteEmployee', inviteEmployeeRouter);
app.use('/registerEmployee', registerEmployeeRouter);

module.exports = app;