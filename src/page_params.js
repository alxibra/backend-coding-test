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

module.exports = req => [
  offset(req),
  rowCount(req),
];
