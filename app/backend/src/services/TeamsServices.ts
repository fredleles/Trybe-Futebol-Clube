import ITeam from '../models/ITeam';
import Team from '../database/models/Team';
import CustomError from '../models/CustomError';
import ITeamServices from './ITeamServices';

class TeamsServices implements ITeamServices {
  private model = Team;

  List = async () : Promise<ITeam[] | []> => {
    const teams = await this.model.findAll() as ITeam[];
    if (!teams) return [];
    return teams;
  };

  GetTeam = async (id: number) : Promise<ITeam> => {
    if (!id) throw new CustomError(404, 'Id Not Found');

    const team = await this.model.findOne({ where: { id } }) as ITeam;
    if (!team) throw new CustomError(404, 'There is no team with such id!');

    return team;
  };
}
export default TeamsServices;
