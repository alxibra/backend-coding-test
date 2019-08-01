module.exports = (req) => {
  return [
    offset(req),
    rowCount(req)
  ]
}

const offset = (req) => {
  if (typeof req.query.page === 'undefined') {
    return 0
  }
  return Number(req.query.page) * rowCount(req);
}

const rowCount = (req) => {
  if (typeof req.query.limit === 'undefined') {
    return 1
  }
  return Number(req.query.limit);
}
