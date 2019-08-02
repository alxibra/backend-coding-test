const response = require('../../src/ride/response.js');
let chai = require('chai');
var expect = chai.expect;

describe('ride response', function(){
  describe('serverError', function(){
    it('return correct response', function(){
      expect(response.serverError()).to.eql({ error_code: 'SERVER_ERROR', message: 'Unknown error_code' });
    });
  })
  describe('notFound', function(){
    it('return correct response', function(){
      expect(response.notFound()).to.eql({ error_code: 'RIDES_NOT_FOUND_ERROR', message: 'Could not find any rides' });
    });
  })
  describe('read', function(){
    describe('when row length is 0', function(){
      var rows = [];
      var error = false;
      it('return correct response', function(){
        expect(response.read(error, rows)).to.eql({ error_code: 'RIDES_NOT_FOUND_ERROR', message: 'Could not find any rides' });
      });
    });
    describe('when error present', function(){
      var rows = [];
      var error = true;
      it('return correct response', function(){
        expect(response.read(error, rows)).to.eql({ error_code: 'SERVER_ERROR', message: 'Unknown error_code' });
      });
    });

    describe('when row is present', function(){
      var rows = [1];
      var error = false;
      it('return correct response', function(){
        expect(response.read(error, rows)).to.eql([1]);
      });
    });
  })
});

