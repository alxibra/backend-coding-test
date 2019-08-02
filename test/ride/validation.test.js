const validation = require('../../src/ride/validation.js');
let chai = require('chai');
var expect = chai.expect;

describe('ride validation', function() {
  var req = {
    body: {
      start_lat: 90,
      start_lon: 180,
      end_lat: 90,
      end_long: 180,
      rider_name: 'alex',
      driver_name: 'alex',
      driver_vehicle: 'test'
    }
  }

  it('must success', function(){
    expect(validation.validate(req)).to.eql({valid: true});
  });

  describe('when start is not valid', function(){
    var req = {
      body: {
        start_lat: 91,
        start_lon: 180,
        end_lat: 90,
        end_long: 180,
        rider_name: 'alex',
        driver_name: 'alex',
        driver_vehicle: 'test'
      }
    }
    var response = {
      error_code: 'VALIDATION_ERROR',
      message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
    }
    it('must not valid', function(){
      expect(validation.validate(req).valid).to.eql(false);
    });
    it('must have message', function(){
      expect(validation.validate(req).response).to.eql(response);
    });
  })
  describe('when end is not valid', function(){
    var req = {
      body: {
        start_lat: 90,
        start_lon: 180,
        end_lat: 91,
        end_long: 180,
        rider_name: 'alex',
        driver_name: 'alex',
        driver_vehicle: 'test'
      }
    }
    it('must not valid', function(){
      expect(validation.validate(req).valid).to.eql(false);
    });
  })
});
