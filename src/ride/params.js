const create = req => (
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

const rowCount = (req) => {
  if (typeof req.query.limit === 'undefined') {
    return 1;
  }
  return Number(req.query.limit);
};

const offset = (req) => {
  if (typeof req.query.page === 'undefined') {
    return 0;
  }
  return Number(req.query.page) * rowCount(req);
};

const index = (req) => [ offset(req), rowCount(req)]


module.exports = {
  index,
  create,
};

