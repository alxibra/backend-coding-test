const create = () => {
return 'INSERT INTO Rides'+
    '(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)' +
    'VALUES (?, ?, ?, ?, ?, ?, ?)'
}

const show = () => 'SELECT * FROM Rides WHERE rideID= ?';
const index = () => 'SELECT * FROM Rides LIMIT ?, ?';
module.exports = {
  index,
  show,
  create,
};

