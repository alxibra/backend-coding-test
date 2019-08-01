module.exports = (req) => {
  return {
    page: Number(req.query.page),
    limit: Number(req.query.limit)
  }
}
