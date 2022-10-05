import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import mocks from './mocks/teamMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  describe('Tests the verb GET at /teams', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Team, 'findAll').resolves(mocks.mockTeams);
    });
  
    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    });
  
    it('Tests if the response gets an array of teams', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .get('/teams')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.mockTeams);
    });

  });

  describe('Tests the verb GET at /teams/:id', () => {

    let chaiHttpResponse: Response;
  
    afterEach(()=>{
      (Team.findOne as sinon.SinonStub).restore();
    });
  
    it('Tests if the response gets a specific team from id', async () => {
      sinon.stub(Team, 'findOne').resolves(mocks.mockOneTeam);
      chaiHttpResponse = await chai
          .request(app)
          .get('/teams/1')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.mockOneTeam);
    });
    
    it('Tests if the response gets a not found message from an invalid id', async () => {
      sinon.stub(Team, 'findOne').resolves(undefined);
      chaiHttpResponse = await chai
          .request(app)
          .get('/teams/a')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(404);
      expect(chaiHttpResponse.body.message).to.be.eq('Id Not Found');
    });
  });
});