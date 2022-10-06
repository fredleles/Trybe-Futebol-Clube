import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import mocks from './mocks/boardMocks';

import { Response } from 'superagent';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderBoard Test', () => {

  let chaiHttpResponse: Response;
  before(() => {
    sinon.stub(Team, 'findAll').resolves(mocks.mockTeams);
    sinon.stub(Match, 'findAll').resolves(mocks.mockMatches);
  });

  afterEach(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Match.findAll as sinon.SinonStub).restore();
  });

  it('Tests if the route /leaderboard gets the right response', async () => {

    chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')
        .send();

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body[0].efficiency).to.be.eq(mocks.mockResult[0].efficiency);
  });
});