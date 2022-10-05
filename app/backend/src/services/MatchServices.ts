import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, INewMatch } from '../models/IMatch';
import TeamsServices from './TeamsServices';
import CustomError from '../models/CustomError';
import TokenHandler from '../utils/TokenHandler';

class MatchServices {
  List = async (filters: object) : Promise<IMatch[] | []> => {
    const matches = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { ...filters },
    }) as IMatch[];

    if (!matches) return [];
    return matches;
  };

  private convertToBool = (value: string) : boolean | undefined => {
    if (value.toLowerCase() === 'false') return false;
    if (value.toLowerCase() === 'true') return true;
    return undefined;
  };

  ListByProgress = async (queryInProgress: string) : Promise<IMatch[] | []> => {
    const inProgress = this.convertToBool(queryInProgress);
    if (inProgress === undefined) throw new Error('InProgress must be true or false');

    return this.List({ inProgress });
  };

  private verifyTeams = async (teamsIds: number[]) => {
    if (teamsIds[0] === teamsIds[1]) {
      throw new CustomError(
        401,
        'It is not possible to create a match with two equal teams',
      );
    }

    const promises = teamsIds.map((id) => TeamsServices.GetTeam(id));
    return Promise.all(promises);
  };

  Create = async (match: INewMatch, token: string | undefined) => {
    TokenHandler.Verify(token);
    await this.verifyTeams([match.awayTeam, match.homeTeam]);

    const newMatch = await Match.create(match);
    return newMatch;
  };

  GetById = async (id: number) : Promise<IMatch> => {
    if (!id) throw new CustomError(404, 'Id Not Found');

    const match = await Match.findOne({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { id },
    }) as IMatch;

    if (!match) throw new CustomError(404, 'There is no match with such id!');
    return match;
  };

  Update = async (id: number, data : object, token: string | undefined) => {
    TokenHandler.Verify(token);
    const refMatch = await this.GetById(id);
    if (refMatch.inProgress === false) throw new CustomError(401, 'Match already finished!');

    const match = await Match.update(data, { where: { id } });
    return match;
  };
}

export default new MatchServices();
