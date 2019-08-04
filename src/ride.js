const mapper = require('./ride/mapper.js');
const validation = require('./ride/validation.js');

const show = (req, res, db) => {
  mapper.show(req, res, db);
};

const index = (req, res, db) => {
  mapper.index(req, res, db);
};

const create = (req, res, db) => {
  const validationResponse = validation.validate(req);
  if (!validationResponse.valid) {
    return res.send(validationResponse.response);
  }
  return mapper.create(req, res, db);
};
module.exports = {
  show,
  index,
  create,
};
