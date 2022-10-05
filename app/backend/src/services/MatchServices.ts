import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, INewMatch } from '../models/IMatch';
import TeamsServices from './TeamsServices';
import CustomError from '../models/CustomError';
import TokenHandler from '../utils/TokenHandler';

class MatchServices {
  List = async () : Promise<IMatch[] | []> => {
    const matches = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
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

    const matches = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress },
    }) as IMatch[];

    if (!matches) return [];
    return matches;
  };

  private verifyTeams = async (teamsIds: number[]) => {
    if (teamsIds[0] === teamsIds[1]) throw new CustomError(
      401,
      'It is not possible to create a match with two equal teams',
    );

    const promises = teamsIds.map((id) => TeamsServices.GetTeam(id));
    return Promise.all(promises);
  };

  Create = async (match: INewMatch, token: string | undefined) => {
    TokenHandler.Verify(token);
    await this.verifyTeams([match.awayTeam, match.homeTeam]);

    const newMatch = await Match.create(match);
    
    return newMatch;
  };
}

export default new MatchServices();
