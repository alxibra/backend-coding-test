const pageParams = require('../page_params.js');

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


const values = req => (
  [
    Number(req.body.start_lat),
    Number(req.body.start_long),
    Number(req.body.end_lat),
    Number(req.body.end_long),
    req.body.rider_name,
    req.body.driver_name,
    req.body.driver_vehicle,
  ]
);

const index = (req, res, db) => {
  db.all('SELECT * FROM Rides LIMIT ?, ?', pageParams(req), (err, rows) => res.send(readResponse(err, rows)));
};

const show = (req, res, db) => {
  db.all('SELECT * FROM Rides WHERE rideID= ?', [req.params.id], (err, rows) => res.send(readResponse(err, rows)));
};

const create = (req, res, db) => {
  db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values(req), (err) => {
    if (err) {
      return res.send(serverErrorResponse());
    }

    db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (error, rows) => {
      if (error) {
        return res.send(serverErrorResponse());
      }
      return res.send(rows);
    });
    return res.send({ code: 'unprocessed_entity' });
  });
};
module.exports = {
  index,
  show,
  create,
};
