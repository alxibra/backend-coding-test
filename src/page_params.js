module.exports = (req) => {
  return {
    page: Number(req.query.page),
    offset: Number(req.query.offset)
  }
}
