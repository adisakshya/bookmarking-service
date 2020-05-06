const express = require('express');
const logger = require('morgan');

/**
 * Express
 */
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Ping Router
 */
const pingRounter = require('./routes/ping');
app.use('/api/v1/ping', pingRounter);

/**
 * Bookmark Router
 */
const bookmarkRouter = require('./routes/bookmark');
app.use('/api/v1/bookmark', bookmarkRouter);

module.exports = app;