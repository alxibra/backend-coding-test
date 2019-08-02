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
});

