var app = require('../app')
var request = require('supertest')(app);
var knex = require('../db/knex')

afterAll(async function (done) {
    const client = knex
    await client.destroy();
    await done();
});
describe("Movies Endpoint", function () {

    it("gets the seeded data", function (done) {
        request.get('/api/v1/movies')
            .expect(200)
            .end(function (err, res) {
                //console.log(res)
                if (err) return done(err)
                expect(res.body.length).toEqual(4)
                done();
            });
    });
})

describe("Appearances Endpoint", function () {
    it("gets the seeded data", function (done) {
        request.get('/api/v1/appearances')
            .expect(200)
            .end(function (err, res) {
                console.log(res.body)
                if (err) return done(err)
                expect(res.body.length).toEqual(4)
                done();
            });
    });

    it("returns data with a movie title and release year", function (done) {
        request.get('/api/v1/appearances')
            .expect(200)
            .end(function (err, res) {
                console.log(res.body)
                if (err) return done(err)
                expect(res.body[0].title).toBeDefined()
                expect(res.body[0].release_year).toBeDefined()
                done();
            });
    });
})