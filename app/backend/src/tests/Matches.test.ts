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
          .get('/match')
          .send();
  
      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(mocks.matches);
    });
  });

  describe('', () => {});

  describe('', () => {});
});