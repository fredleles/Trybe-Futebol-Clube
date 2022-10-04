import ITeam from '../models/ITeam';
import Team from '../database/models/Team';
import CustomError from '../models/CustomError';

class TeamsServices {
  List = async () : Promise<ITeam[] | []> => {
    const teams = await Team.findAll() as ITeam[];
    if (!teams) return [];
    return teams;
  };

  GetTeam = async (id: number) : Promise<ITeam> => {
    const team = await Team.findOne({ where: { id } }) as ITeam;
    if (!team) throw new CustomError(404, 'Id Not Found');

    return team;
  };
}
export default new TeamsServices();