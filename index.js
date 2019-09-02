'use strict';

const mongoose = require('mongoose');
const app = require('./src/app.js');

mongoose.connect('mongodb://localhost:27017/class-15', {
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.start(3000);