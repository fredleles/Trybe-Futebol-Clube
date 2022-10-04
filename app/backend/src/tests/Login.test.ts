import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import mocks from './mocks/userMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {

  let chaiHttpResponse: Response;

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Tests if the response gets a token with a valid user', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(mocks.validUser);

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
    sinon
      .stub(User, "findOne")
      .resolves(undefined);

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
    sinon
      .stub(User, "findOne")
      .resolves(mocks.validUser);

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
    sinon
      .stub(User, "findOne")
      .resolves(mocks.validUser);

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
    sinon
      .stub(User, "findOne")
      .resolves(mocks.validUser);

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
