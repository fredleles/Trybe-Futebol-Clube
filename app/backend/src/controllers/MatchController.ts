import { NextFunction, Request, Response } from 'express';
import CustomError from '../models/CustomError';
import { IMatch, INewMatch } from '../models/IMatch';
import MatchServices from '../services/MatchServices';

class MatchController {
  private service = MatchServices;

  ListMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      let matches;
      if (!inProgress || inProgress === '') {
        matches = await this.service.List({});
      } else {
        matches = await this.service.ListByProgress(inProgress.toString());
      }
      res.status(200).send(matches);
    } catch (error) {
      next(error);
    }
  };

  CreateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const match = await this.service.Create(req.body as INewMatch, authorization);
      res.status(201).send(match);
    } catch (error) {
      next(error);
    }
  };

  UpdateInProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { authorization } = req.headers;
      if (!parseInt(id, 10)) throw new CustomError(404, 'Id Not Found');

      await this.service.Update(+id, { inProgress: false }, authorization);
      return res.status(200).send({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };

  UpdateScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { authorization } = req.headers;
      const { homeTeamGoals, awayTeamGoals } = req.body as IMatch;
      const data = { homeTeamGoals, awayTeamGoals };
      if (!parseInt(id, 10)) throw new CustomError(404, 'Id Not Found');

      await this.service.Update(+id, data, authorization);
      return res.status(200).send({ message: 'Updated' });
    } catch (error) {
      next(error);
    }
  };
}
export default new MatchController();
