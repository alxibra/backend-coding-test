'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
let chai = require('chai');

var expect = chai.expect;

describe('API tests', () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });
    describe('POST /rides', () => {
        it('should return created content', (done) => {
            var body = {
                  start_lat: 90,
                  start_long: 180,
                  end_lat: 80,
                  end_long: 180,
                  rider_name: "alex",
                  driver_name: "alex",
                  driver_vehicle: "test"
              }
            var expected_response = function(err, res) {
              if (err) {
               return done(err);
              }
              const content = res.body[0]
              expect(content.rideID).to.be.equal(1);
              expect(content.startLat).to.be.equal(90);
              expect(content.startLong).to.be.equal(180);
              expect(content.endLat).to.be.equal(80);
              expect(content.endLong).to.be.equal(180);
              expect(content.riderName).to.be.equal('alex');
              expect(content.driverName).to.be.equal('alex');
              expect(content.driverVehicle).to.be.equal('test');
              return done();
            }
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200)
                .end(expected_response);
        });
    });
    describe('POST /rides with invalid start', () => {
        it('should return created content', (done) => {
            var body = {
                  start_lat: 92,
                  start_long: 180,
                  end_lat: 80,
                  end_long: 180,
                  rider_name: "alex",
                  driver_name: "alex",
                  driver_vehicle: "test"
              }
            var expected_response = function(err, res) {
              if (err) {
               return done(err);
              }
              const content = res.body
              expect(content.error_code).to.be.equal('VALIDATION_ERROR');
              expect(content.message).to.be.equal("Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
              return done();
            }
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200)
                .end(expected_response);
        });
    });
    describe('POST /rides with invalid end', () => {
        it('should return created content', (done) => {
            var body = {
                  start_lat: 90,
                  start_long: 180,
                  end_lat: 92,
                  end_long: 180,
                  rider_name: "alex",
                  driver_name: "alex",
                  driver_vehicle: "test"
              }
            var expected_response = function(err, res) {
              if (err) {
               return done(err);
              }
              const content = res.body
              expect(content.error_code).to.be.equal('VALIDATION_ERROR');
              expect(content.message).to.be.equal("End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively");
              return done();
            }
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200)
                .end(expected_response);
        });
    });

    describe('POST /rides with driver name', () => {
        it('should return created content', (done) => {
            var body = {
                  start_lat: 90,
                  start_long: 180,
                  end_lat: 90,
                  end_long: 180,
                  rider_name: "check",
                  driver_name: "",
                  driver_vehicle: "test"
              }
            var expected_response = function(err, res) {
              if (err) {
               return done(err);
              }
              const content = res.body
              expect(content.error_code).to.be.equal('VALIDATION_ERROR');
              expect(content.message).to.be.equal("Driver name must be a non empty string");
              return done();
            }
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200)
                .end(expected_response);
        });
    });
    describe('POST /rides with rider name', () => {
        it('should return created content', (done) => {
            var body = {
                  start_lat: 90,
                  start_long: 180,
                  end_lat: 90,
                  end_long: 180,
                  rider_name: "",
                  driver_name: "alex",
                  driver_vehicle: "test"
              }
            var expected_response = function(err, res) {
              if (err) {
               return done(err);
              }
              const content = res.body
              expect(content.error_code).to.be.equal('VALIDATION_ERROR');
              expect(content.message).to.be.equal("Rider name must be a non empty string");
              return done();
            }
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200)
                .end(expected_response);
        });
    });
    describe('POST /rides with rider vehicle', () => {
        it('should return created content', (done) => {
            var body = {
                  start_lat: 90,
                  start_long: 180,
                  end_lat: 90,
                  end_long: 180,
                  rider_name: "alex",
                  driver_name: "alex",
                  driver_vehicle: ""
              }
            var expected_response = function(err, res) {
              if (err) {
               return done(err);
              }
              const content = res.body
              expect(content.error_code).to.be.equal('VALIDATION_ERROR');
              expect(content.message).to.be.equal("Driver Vehicle must be a non empty string");
              return done();
            }
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200)
                .end(expected_response);
        });
    });
});
