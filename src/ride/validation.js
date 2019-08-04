const isValidStart = (lat, lon) => lat < -90 || lat > 90 || lon < -180 || lon > 180;
const isValidEnd = (lat, lon) => (lat < -90 || lat > 90 || lon < -180 || lon > 180);
const isValidName = name => (typeof name !== 'string' || name.length < 1);

const invalidStartResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
});

const invalidEndResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
});
const invalidRiderNameResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Rider name must be a non empty string',
});

const invalidDriverNameResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Driver name must be a non empty string',
});

const invalidDriverVehicleResponse = () => ({
  error_code: 'VALIDATION_ERROR',
  message: 'Driver Vehicle must be a non empty string',
});

const mapRequestBody = req => (
  {
    startLatitude: Number(req.body.start_lat),
    startLongitude: Number(req.body.start_long),
    endLatitude: Number(req.body.end_lat),
    endLongitude: Number(req.body.end_long),
    riderName: req.body.rider_name,
    driverName: req.body.driver_name,
    driverVehicle: req.body.driver_vehicle,
  }
);

const validationResponse = (body) => {
  if (isValidStart(body.startLatitude, body.startLongitude)) {
    return { valid: false, response: invalidStartResponse() };
  }

  if (isValidEnd(body.endLatitude, body.endLongitude)) {
    return { valid: false, response: invalidEndResponse() };
  }

  if (isValidName(body.riderName)) {
    return { valid: false, response: invalidRiderNameResponse() };
  }

  if (isValidName(body.driverName)) {
    return { valid: false, response: invalidDriverNameResponse() };
  }

  if (isValidName(body.driverVehicle)) {
    return { valid: false, response: invalidDriverVehicleResponse() };
  }

  return { valid: true };
};

const validate = (req) => {
  const body = mapRequestBody(req);
  return validationResponse(body);
};

module.exports = {
  validate,
};
