const asyncMiddleware = require('./utils/async_middleware.js');
const express = require('express');
const bodyParser = require('body-parser');
const ride = require('./ride.js');
const app = express();
const jsonParser = bodyParser.json();
const logger = require('../config/winston.js');

module.exports = (db) => {
  app.get('/health', asyncMiddleware(async (req, res, next) => res.send('Healthy')));

  app.post('/rides', jsonParser, asyncMiddleware(async(req, res, next) => {
    ride.create(req, res, db);
  }));

  app.get('/rides', asyncMiddleware(async(req, res, next) => {
    ride.index(req, res, db);
  }));

  app.get('/rides/:id', asyncMiddleware(async(req, res, next) => {
    ride.show(req, res, db);
  }));

  return app;
};
