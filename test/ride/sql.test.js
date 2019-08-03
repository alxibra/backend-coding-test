const sql = require('../../src/ride/sql.js');
let chai = require('chai');
var expect = chai.expect;

describe('ride sql', function(){
  describe('index', function(){
    it('return correct sql query', function(){
      expect(sql.index()).to.eql('SELECT * FROM Rides LIMIT ?, ?');
    });
  });
  describe('index', function(){
    it('return correct sql query', function(){
      expect(sql.index()).to.eql('SELECT * FROM Rides LIMIT ?, ?');
    });
  });
  describe('create', function(){
    it('return correct sql query', function(){
      expect(sql.create()).to.eql('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)VALUES (?, ?, ?, ?, ?, ?, ?)');
    });
  });
});

