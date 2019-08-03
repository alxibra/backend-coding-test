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
  describe('index', function() {
    describe('when page and limit are not availabe', function() {
      it('return [0, 1]', function() {
        var req = { query: {}  }
        expect(params.index(req)).to.eql([0, 1]);
      });
    });
    describe('when limit are not availabe', function() {
      it('return [0, 1]', function() {
        var req = { query: {page: 1}  }
        expect(params.index(req)).to.eql([1, 1]);
      });
    });

    describe('when page are not availabe', function() {
      it('return [0, 1]', function() {
        var req = { query: {limit: 2}  }
        expect(params.index(req)).to.eql([0, 2]);
      });
    });

    describe('when page and limit are availabe', function() {
      it('return [0, 1]', function() {
        var req = { query: {limit: 2, page: 2}  }
        expect(params.index(req)).to.eql([4, 2]);
      });
    });
  });
})

