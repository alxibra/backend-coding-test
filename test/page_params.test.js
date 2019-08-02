'use strict';

const pageParams = require('../src/page_params')
let chai = require('chai');
var expect = chai.expect;

describe('pageParams', function() {
  describe('when page and limit are not availabe', function() {
    it('return [0, 1]', function() {
      var req = { query: {}  }
      expect(pageParams(req)).to.eql([0, 1]);
    });
  });
  describe('when limit are not availabe', function() {
    it('return [0, 1]', function() {
      var req = { query: {page: 1}  }
      expect(pageParams(req)).to.eql([1, 1]);
    });
  });

  describe('when page are not availabe', function() {
    it('return [0, 1]', function() {
      var req = { query: {limit: 2}  }
      expect(pageParams(req)).to.eql([0, 2]);
    });
  });

  describe('when page and limit are availabe', function() {
    it('return [0, 1]', function() {
      var req = { query: {limit: 2, page: 2}  }
      expect(pageParams(req)).to.eql([4, 2]);
    });
  });
});
