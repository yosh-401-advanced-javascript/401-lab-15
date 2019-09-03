'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFound = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

const routes = require('./router.js');
const categoriesRoute = require('./categories-router.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(categoriesRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = {
  start: (port) => {
    app.listen(port, () => {
      console.log('App is listen on ', port);
    });
  },
  server: app,
};