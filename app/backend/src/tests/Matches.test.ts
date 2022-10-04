import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Match';
import mocks from './mocks/matchMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  describe('Test the verb GET at /matches', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'findAll').resolves(mocks.matches);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('Tests if the response gets an array of matches', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.matches);
    });
  });

  describe('Test the verb GET at /matches with filters', () => {

    let chaiHttpResponse: Response;
    before(() => {
      sinon.stub(Match, 'findAll').resolves(mocks.inProgressMatches);
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    });
  
    it('Tests the route with a query equal inProgress=true', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.inProgressMatches);
    });

  });

  describe('Test the verb GET at /matches with an invalid inProgress filter', () => {

    let chaiHttpResponse: Response;
  
    it('Tests the route with a query equal inProgress=invalid', async () => {
  
      chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=invalid')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(500);
      expect(chaiHttpResponse.body.message).to.be.deep.eq('InProgress mmust be true or false');
    });
  });
});