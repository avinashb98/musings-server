/* eslint-disable */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Musings Server Testing', () => {
  describe('Testing for welcome message', () => {
    it('it should GET a welcome message', (done) => {
      chai.request(server)
        .get('/v1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.msg.should.eql('Welcome to musings server');
          done();
        });
    });
  });

  describe('Testing for Registering User', () => {
    it('it registers a new user', (done) => {
      chai.request(server)
        .post('/v1/register')
        .send({
          username: 'john',
          password: 'doe',
          location: 'Tokyo'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.msg.should.eql('User successfuly registered');
          done();
        });
    });
  });



  describe('Testing for update and get user info', () => {
    let jwtToken = '';
    beforeEach(function(done) {
      chai.request(server)
        .post('/v1/user/login')
        .send({
          username: 'john',
          password: 'doe'
        })
        .end(function(err, res) {
          let result = JSON.parse(res.text);
          jwtToken = result.token;
          done();
        });
    });

    it('it updates user info', () => {
      chai.request(server)
        .get('/v1/user/update')
        .set('Authorization', `bearer ${jwtToken}`)
        .type('json')
        .send({
          username: 'john',
          location: 'surrey'
        })
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          done();
        });
    });

    it('it returns info of user', () => {
      chai.request(server)
        .get('/v1/user/john')
        .set('Authorization', `bearer ${jwtToken}`)
        .type('json')
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          done();
        });
    });
  });
});