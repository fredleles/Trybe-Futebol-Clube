import { NextFunction, Request, Response } from 'express';
import LeaderBoardServices from '../services/LeaderBoardServices';

class LeaderBoardController {
  private service = LeaderBoardServices;

  GetHomeLeaders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await this.service.List('home');
      return res.status(200).send(board);
    } catch (error) {
      next(error);
    }
  };

  GetAwayLeaders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await this.service.List('away');
      return res.status(200).send(board);
    } catch (error) {
      next(error);
    }
  };

  GetLeadersBoard = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await this.service.List('full');
      return res.status(200).send(board);
    } catch (error) {
      next(error);
    }
  };
}
export default new LeaderBoardController();
