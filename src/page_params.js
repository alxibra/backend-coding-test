module.exports = (req) => {
  return [
    Number(req.query.page),
    Number(req.query.limit)
  ]
}
