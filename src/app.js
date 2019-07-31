
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const logger = require('../config/winston.js');

const isValidStart = (lat, lon) => lat < -90 || lat > 90 || lon < -180 || lon > 180;
const isValidEnd = (lat, lon) => (lat < -90 || lat > 90 || lon < -180 || lon > 180);
const isValidName = name => (typeof name !== 'string' || name.length < 1);

const serverErrorResponse = () => ({ error_code: 'SERVER_ERROR', message: 'Unknown error_code' });
const notFoundResponse = () => ({ error_code: 'RIDES_NOT_FOUND_ERROR', message: 'Could not find any rides' });

const readResponse = (error, rows) => {
  let response;
  if (error) {
    response = serverErrorResponse();
  } else if (rows.length === 0) {
    response = notFoundResponse();
  } else {
    response = rows;
  }

  return response;
};

const invalidStartResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
});

const invalidEndResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
});

const invalidRiderNameResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Rider name must be a non empty string',
});

const invalidDriverNameResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Driver name must be a non empty string',
});

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;

    if (isValidStart(startLatitude, startLongitude)) {
      return res.send(invalidStartResponse());
    }

    if (isValidEnd(endLatitude, endLongitude)) {
      return res.send(invalidEndResponse());
    }

    if (isValidName(riderName)) {
      return res.send(invalidRiderNameResponse());
    }

    if (isValidName(driverName)) {
      return res.send(invalidDriverNameResponse());
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
      return res.send({
        error_code: 'VALIDATION_ERROR',
        message: 'Driver Vehicle must be a non empty string',
      });
    }

    const values = [
      req.body.start_lat,
      req.body.start_long,
      req.body.end_lat,
      req.body.end_long,
      req.body.rider_name,
      req.body.driver_name,
      req.body.driver_vehicle,
    ];

    db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
      if (err) {
        return res.send(serverErrorResponse());
      }

      db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (error, rows) => {
        if (error) {
          return res.send(serverErrorResponse());
        }

        return res.send(rows);
      });
      return null;
    });
    return null;
  });

  app.get('/rides', (req, res) => {
    db.all('SELECT * FROM Rides', (err, rows) => res.send(readResponse(err, rows)));
  });

  app.get('/rides/:id', (req, res) => {
    db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => res.send(readResponse(err, rows)));
  });

  return app;
};
