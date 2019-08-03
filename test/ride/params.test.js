const params = require('../../src/ride/params.js');
let chai = require('chai');
var expect = chai.expect;

describe('ride params', function(){
  describe('create', function(){
    var req = {
      body: {
        start_lat: 90,
        start_long: 180,
        end_lat: 90,
        end_long: 180,
        rider_name: 'alex',
        driver_name: 'alex',
        driver_vehicle: 'test'
      }
    }
    it('return params', function(){
      expect(params.create(req)).to.eql([ 90, 180, 90, 180, 'alex', 'alex', 'test' ]);
    })
  });
})

