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
}
export default new MatchServices();
