import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import mocks from './mocks/userMocks';

import { Response } from 'superagent';
import TokenHandler from '../utils/TokenHandler';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
  describe('Valid User', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves(mocks.validUser);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });
  
    it('Tests if the response gets a token with a valid user', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
          email: 'user@user.com',
          password: 'secret_user',
        });
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('Invalid email', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves(undefined);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Tests if the response gets a error message with an invalid email', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
          email: 'invalid@user.com',
          password: 'secret_user',
        });
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.eq('Incorrect email or password');
    });
  });
  
  describe('invalid password', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves(mocks.validUser);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Tests if the response gets a error message with an invalid password', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
          email: 'user@user.com',
          password: 'secret_invalid',
        });
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.eq('Incorrect email or password');
    });
  });
  
  describe('Invalid request body - email', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves();
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Tests if the response gets a error message with a request without email', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
          email: 'user@user.com',
        });
  
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.eq('All fields must be filled');
    });
  });

  describe('Invalid request body - password', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves();
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Tests if the response gets a error message with a request without password', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
          password: 'secret_invalid',
        });
  
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.eq('All fields must be filled');
    });
  });
  
  describe('Validate token', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves(mocks.validUser);
      sinon.stub(TokenHandler, 'Verify').resolves(mocks.loggedUser);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
      (TokenHandler.Verify as sinon.SinonStub).restore();
    });

    it('Tests if the response gets the right role with a valid token', async () => {
  
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'token')
        .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.role).to.eq('user');
    });
  });

  describe('Not authorized', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(User, 'findOne').resolves();
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Tests if the response gets an error message when requested without a token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .send();
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.eq('Token must be a valid token');
    });
  });
  
});
