import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../models/IMatch';

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
    if (inProgress === undefined) throw new Error('InProgress mmust be true or false');

    const matches = await Match.findAll({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress },
    }) as IMatch[];

    if (!matches) return [];
    return matches;
  };
}

export default new MatchServices();
