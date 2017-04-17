/**
 * Created by: Jiravat
 * Date: 4/13/2017
 * Project: eduo-server
 */
'use strict';
//do promise
global.Promise = require('bluebird');

global.test = "test";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const config = require('config');



chai.use(chaiHttp);

describe('Authentication', function() {
    it('register it should error and report email already exists in the system', (done) => {
        chai.request(server)
            .post(`/api/v${config.API_VERSION}`+'/register')
            .send(JSON.parse(`{
    "username": "User",
    "firstName": "user",
    "lastName": "user",
    "email": "email@gmail.com",
    "password": "password",
    "avatarUrl": "img/thumbnail.png",
    "phone": "+1 123-1234-123",
    "role": "student",
    "address": {
      "coordinates": [
        73,
        56
      ],
      "line1": "Address 1",
      "city": "City 1",
      "postalCode": "10000",
      "state": "state",
      "primary": true
    }
  }`))
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('error').eql('email already exists in the system');
                done();
            });
    });
    it('login', (done) => {
            chai.request(server)
                .post(`/api/v${config.API_VERSION}`+'/login')
                .send(JSON.parse(`{
        "email":"user@gmail.com",
            "password" : "user"
    }`))
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('accessToken');
                    done();
                });
    });
});