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
  describe('Tests the verb POST at /login', () => {

    let chaiHttpResponse: Response;
    before(() => {
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });
  
    it('Tests if the response gets a token with a valid user', async () => {
      sinon.stub(User, 'findOne').resolves(mocks.validUser);
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
    
    it('Tests if the response gets a error message with an invalid email', async () => {
      sinon.stub(User, 'findOne').resolves(undefined);
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

    it('Tests if the response gets a error message with an invalid password', async () => {
      sinon.stub(User, 'findOne').resolves(mocks.validUser);
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

    it('Tests if the response gets a error message with a request without email', async () => {
      sinon.stub(User, 'findOne').resolves();
      chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
          email: 'user@user.com',
        });
  
      expect(chaiHttpResponse.status).to.be.eq(400);
      expect(chaiHttpResponse.body.message).to.eq('All fields must be filled');
    });

    it('Tests if the response gets a error message with a request without password', async () => {
      sinon.stub(User, 'findOne').resolves();
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
  
  describe('Tests the verb GET at /login/validate', () => {
    let chaiHttpResponse: Response;

    afterEach(() => {
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Tests if the response gets the right role with a valid token', async () => {
      sinon.stub(User, 'findOne').resolves(mocks.validUser);
      sinon.stub(TokenHandler, 'Verify').resolves(mocks.loggedUser);

      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'token')
        .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.role).to.eq('user');
      (TokenHandler.Verify as sinon.SinonStub).restore();
    });
    
    it('Tests if the response gets an error message when requested without a token', async () => {
      sinon.stub(User, 'findOne').resolves();
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .send();
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.eq('Token must be a valid token');
    });
  });

  describe('Not authorized', () => {
    let chaiHttpResponse: Response;
    before(() => {
      
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    });

  });
  
});
