import { NextFunction, Request, Response } from 'express';
import ITeamServices from '../services/ITeamServices';
import CustomError from '../models/CustomError';
import ITeamController from './ITeamController';

class TeamsController implements ITeamController {
  constructor(private service : ITeamServices) {}

  ListTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.List();
      return res.status(200).send(teams);
    } catch (error) {
      next(error);
    }
  };

  GetTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!parseInt(id, 10)) throw new CustomError(404, 'Id Not Found');

      const team = await this.service.GetTeam(+id);
      return res.status(200).send(team);
    } catch (error) {
      next(error);
    }
  };
}
export default TeamsController;
