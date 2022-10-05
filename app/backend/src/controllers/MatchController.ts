import { NextFunction, Request, Response } from 'express';
import { INewMatch } from '../models/IMatch';
import MatchServices from '../services/MatchServices';

class MatchController {
  private service = MatchServices;

  ListMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      let matches;
      if (!inProgress || inProgress === '') {
        matches = await this.service.List();
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
}
export default new MatchController();
