var assert = require('assert');
var request = require('supertest');

describe('Sample unit tests', function () {

    function add(x, y){
        return x+y;
    }

    //inside describe block
    var server;
    beforeEach(function () {
        server = require('./server').server;
    });

    it('should return 5', function () {
        assert.equal(add(2,3), 5);
    });

    it('should respond with an htmL file when root is requested', function (done) {
        request(server)
            .get('/')
            .expect(200)
            .end(function (err, response) {
                assert.equal(response.header['content-type'], 'text/html; charset=UTF-8');
                done();
            });
    });

    it('should respond with JSON data when API is called', function (done) {
        request(server)
            .get('/api/person')
            .expect(200)
            .end(function (err, response) {
                assert.equal(response.header['content-type'], 'application/json; charset=utf-8');
                assert.deepEqual(response.body, {
                    name:"Alex",
                    city:"London",
                    age:25
                });
                done();
            });
    });

    it('should send 404 when a request is made to any other path', function (done) {
      request(server)
        .get('/dummy/path')
        .expect(404, done);
    });
});
