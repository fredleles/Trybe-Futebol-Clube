import ITeam from '../models/ITeam';

export default interface ITeamServices {
  List(): Promise<ITeam[] | []>;
  GetTeam(id: number) : Promise<ITeam>;
}
