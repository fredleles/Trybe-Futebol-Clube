import { NextFunction, Request, Response } from 'express';
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
}
export default new MatchController();
