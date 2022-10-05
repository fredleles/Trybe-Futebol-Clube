import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import mocks from './mocks/matchMocks';

import { Response } from 'superagent';
import TeamsServices from '../services/TeamsServices';
import TokenHandler from '../utils/TokenHandler';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {

  describe('Tests the verb GET at /matches', () => {

    let chaiHttpResponse: Response;
  
    afterEach(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('Tests if the response gets an array of matches', async () => {
      sinon.stub(Match, 'findAll').resolves(mocks.matches);
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.matches);
    });
  
    it('Tests the route with a query equal inProgress=true', async () => {
      sinon.stub(Match, 'findAll').resolves(mocks.inProgressMatches);
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.inProgressMatches);
    });

    it('Tests the route with a query equal inProgress=invalid', async () => {
      sinon.stub(Match, 'findAll').resolves();
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=invalid')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(500);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('InProgress must be true or false');
    });
  });

  describe('Tests the verb POST at /matches', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'create').resolves(mocks.createdMatch);
      sinon.stub(TeamsServices, 'GetTeam').resolves();
    });
  
    after(()=>{
      (Match.create as sinon.SinonStub).restore();
      (TeamsServices.GetTeam as sinon.SinonStub).restore();
    });
  
    it('Tests the route with a valid new match', async () => {
      sinon.stub(TokenHandler, 'Verify').resolves();
      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', 'token')
          .send(mocks.validMatch);
  
      expect(chaiHttpResponse.status).to.be.eq(201);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.createdMatch);
      (TokenHandler.Verify as sinon.SinonStub).restore();
    });
    
    it('Tests the route with a match with duplicate teams', async () => {
      sinon.stub(TokenHandler, 'Verify').resolves();  
      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', 'token')
          .send(mocks.eqTeamsMatch);
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('It is not possible to create a match with two equal teams');
      (TokenHandler.Verify as sinon.SinonStub).restore();
    });
    
    it('Tests the route without a token', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .send(mocks.validMatch);
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Token must be a valid token');
    });
    
    it('Tests the route with an invalid token', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set('Authorization', 'invalid_token')
          .send(mocks.validMatch);
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Token must be a valid token');
    });
  });
});
