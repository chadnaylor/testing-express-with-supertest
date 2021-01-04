var app = require('../app')
var request = require('supertest')(app);
var knex = require('../db/knex')

describe("Movies API", function () {
    afterAll(async function (done) {
        const client = knex
        await client.destroy();
        await done();
    });
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

