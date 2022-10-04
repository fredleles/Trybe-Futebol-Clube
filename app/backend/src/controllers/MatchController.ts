import { NextFunction, Request, Response } from 'express';
import MatchServices from '../services/MatchServices';

class MatchController {
  private service = MatchServices;

  ListMatches = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.List();
      res.status(200).send(matches);
    } catch (error) {
      next(error);
    }
  };
}
export default new MatchController();
