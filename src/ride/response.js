const serverError = () => ({ error_code: 'SERVER_ERROR', message: 'Unknown error_code' });
const notFound = () => ({ error_code: 'RIDES_NOT_FOUND_ERROR', message: 'Could not find any rides' });
const read = (error, rows) => {
  let response;
  if (error) {
    response = serverError();
  } else if (rows.length === 0) {
    response = notFound();
  } else {
    response = rows;
  }

  return response;
};

module.exports = {
  serverError,
  notFound,
  read,
}

