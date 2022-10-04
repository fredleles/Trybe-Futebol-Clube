import { NextFunction, Request, Response } from 'express';
import CustomError from '../models/CustomError';
import TeamsServices from '../services/TeamsServices';

class TeamsController {
  private service = TeamsServices;

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
export default new TeamsController();
