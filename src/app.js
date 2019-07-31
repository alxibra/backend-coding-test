
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

const invalidDriverVehicleResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Driver Vehicle must be a non empty string',
});

const mapRequestBody = (req) => (
  {
    startLatitude: Number(req.body.start_lat),
    startLongitude: Number(req.body.start_long),
    endLatitude: Number(req.body.end_lat),
    endLongitude: Number(req.body.end_long),
    riderName: req.body.rider_name,
    driverName: req.body.driver_name,
    driverVehicle: req.body.driver_vehicle
  }
)

const validationResponse = (body) => {
  if (isValidStart(body.startLatitude, body.startLongitude)) {
    return { valid: false, response: invalidStartResponse() };
  }

  if (isValidEnd(body.endLatitude, body.endLongitude)) {
    return { valid: false, response: invalidEndResponse() };
  }

  if (isValidName(body.riderName)) {
    return { valid: false , response: invalidRiderNameResponse() };
  }

  if (isValidName(body.driverName)) {
    return { valid: false, response: invalidDriverNameResponse() };
  }

  if (isValidName(body.driverVehicle)) {
    return { valid: false, response: invalidDriverVehicleResponse() };
  }

  return { valid: true }
}

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) => {
    const body = mapRequestBody(req);

    if (!validationResponse(body).valid) {
      return res.send(validationResponse(body).response);
    }

    const values = [
      body.startLatitude,
      body.startLongitude,
      body.endLatitude,
      body.endLongitude,
      body.riderName,
      body.driverName,
      body.driverVehicle,
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
