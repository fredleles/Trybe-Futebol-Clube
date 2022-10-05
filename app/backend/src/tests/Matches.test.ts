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

  describe('Tests the verb PATCH at /matches', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'update').resolves();
      sinon.stub(TokenHandler, 'Verify').resolves(); 
    });
  
    after(()=>{
      (Match.update as sinon.SinonStub).restore();
      (TokenHandler.Verify as sinon.SinonStub).restore();
    });
    
    it('Tests if a score update is possible', async () => {
      sinon.stub(Match, 'findOne').resolves({ id: 1, inProgress: true } as Match);
  
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1')
          .set('Authorization', 'token')
          .send({
            homeTeamGoals: 3,
            awayTeamGoals: 2
          });
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Updated');
      (Match.findOne as sinon.SinonStub).restore();
    });
    
    it('Tests if a score update is possible without an id', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches')
          .set('Authorization', 'token')
          .send({
            homeTeamGoals: 3,
            awayTeamGoals: 2
          });
  
      expect(chaiHttpResponse.status).to.be.eq(500);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Invalid request');
    });
    
    it('Tests if a score update is possible with an invalid id', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/NaN')
          .set('Authorization', 'token')
          .send({
            homeTeamGoals: 3,
            awayTeamGoals: 2
          });
  
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Id Not Found');
    });
    
    it('Tests if a score update is possible with an id that doesnt exists', async () => {
      sinon.stub(Match, 'findOne').resolves();
  
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1000')
          .set('Authorization', 'token')
          .send({
            homeTeamGoals: 3,
            awayTeamGoals: 2
          });
  
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('There is no match with such id!');
      (Match.findOne as sinon.SinonStub).restore();
    });
    
    it('Tests if a match can have its progress updated', async () => {
      sinon.stub(Match, 'findOne').resolves({ id: 1, inProgress: true } as Match);
  
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
          .set('Authorization', 'token')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Finished');
      (Match.findOne as sinon.SinonStub).restore();
    });
    
    it('Tests if a finished match can have its progress updated', async () => {
      sinon.stub(Match, 'findOne').resolves({ id: 1, inProgress: false } as Match);
  
      chaiHttpResponse = await chai
          .request(app)
          .patch('/matches/1/finish')
          .set('Authorization', 'token')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(401);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('Match already finished!');
      (Match.findOne as sinon.SinonStub).restore();
    });
  });
});
