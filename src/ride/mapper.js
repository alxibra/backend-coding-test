const pageParams = require('../page_params.js');
const response = require('./response.js');

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

const privateShow = (id, db, res) => {
  db.all('SELECT * FROM Rides WHERE rideID = ?', id, (error, rows) => {
    if (error) {
      return res.send(response.serverError());
    }
    return res.send(rows);
  });
};

const index = (req, res, db) => {
  db.all('SELECT * FROM Rides LIMIT ?, ?', pageParams(req), (err, rows) => res.send(response.read(err, rows)));
};

const show = (req, res, db) => {
  db.all('SELECT * FROM Rides WHERE rideID= ?', [req.params.id], (err, rows) => res.send(response.read(err, rows)));
};

const create = (req, res, db) => {
  db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values(req), function (err) {
    if (err) {
      return res.send(response.serverError());
    }
    return privateShow(this.lastID, db, res);
  });
};

module.exports = {
  index,
  show,
  create,
};
