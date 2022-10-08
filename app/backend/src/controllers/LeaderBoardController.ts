import { NextFunction, Request, Response } from 'express';
import ILeaderBoardServices from '../services/ILeaderBoardServices';
import ILeaderBoardController from './ILeaderBoardController';

class LeaderBoardController implements ILeaderBoardController {
  constructor(private service : ILeaderBoardServices) {};

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
export default LeaderBoardController;
