const pageParams = require('../page_params.js');
const response = require('./response.js');
const sql = require('./sql'); 

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
  db.all(
    sql.show(),
    id,
    (err, rows) => res.send(response.read(err, rows)),
  );
};

const index = (req, res, db) => {
  db.all(
    sql.index(),
    pageParams(req),
    (err, rows) => res.send(response.read(err, rows)),
  );
};

const show = (req, res, db) => {
  privateShow(req.params.id, db, res);
};

const create = (req, res, db) => {
  db.run(
    sql.create(),
    values(req),
    function (err) {
      if (err) {
        return res.send(response.serverError());
      }
      return privateShow(this.lastID, db, res);
    },
  );
};

module.exports = {
  index,
  show,
  create,
};
