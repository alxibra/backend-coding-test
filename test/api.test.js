'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');

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
            request(app)
                .post('/rides')
                .send(body)
                .set('Accept', 'application/json')
                .expect(200, done);
        });
    });
});
