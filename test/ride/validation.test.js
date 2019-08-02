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
});
