var app = require('../app.js'),
    chai = require('chai'),
    request = require('supertest');

let token;

describe('POST /authenticate', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/authenticate')
            .send({ username: 'karthik', password: 'Karthik@123' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                token = res.body.token;
                done();
            });
    });
});

describe('GET /', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .set({ "Authorization": "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/todo?id=3')
            .set('Accept', 'application/json')
            .set({ "Authorization": "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /create', function () {
    it('responds with json', function (done) {
        request(app)
            .post('/create')
            .send({
                "todoTitle":"Eighth Task",
                "description":"Task to complete as 8"
            })
            .set('Accept', 'application/json')
            .set({ "Authorization": "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('PUT /todo', function () {
    it('responds with json', function (done) {
        request(app)
            .put('/todo?id=3')
            .send({
                "todoTitle":"Third Task",
                "description":"Task to complete as 3rd"
            })
            .set('Accept', 'application/json')
            .set({ "Authorization": "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /todo', function () {
    it('responds with json', function (done) {
        request(app)
            .delete('/todo?id=4')
            .set('Accept', 'application/json')
            .set({ "Authorization": "Bearer " + token })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});