const express = require('express');
const bodyParser = require('body-parser');
const ride = require('./ride.js');
const app = express();
const jsonParser = bodyParser.json();
const logger = require('../config/winston.js');

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) => {
    ride.create(req, res, db);
  });

  app.get('/rides', (req, res) => {
    ride.index(req, res, db);
  });

  app.get('/rides/:id', (req, res) => {
    ride.show(req, res, db);
  });

  return app;
};
