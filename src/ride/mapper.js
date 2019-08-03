const pageParams = require('../page_params.js');
const params = require('./params.js');
const response = require('./response.js');
const sql = require('./sql'); 

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
    params.index(req),
    (err, rows) => res.send(response.read(err, rows)),
  );
};

const show = (req, res, db) => {
  privateShow(req.params.id, db, res);
};

const create = (req, res, db) => {
  db.run(
    sql.create(),
    params.create(req),
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
