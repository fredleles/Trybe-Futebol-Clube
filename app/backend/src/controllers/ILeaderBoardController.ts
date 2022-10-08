import { NextFunction, Request, Response } from 'express';

export default interface ILeaderBoardController {
  GetHomeLeaders(req: Request, res: Response, next: NextFunction) : Promise<any>;
  GetAwayLeaders(req: Request, res: Response, next: NextFunction) : Promise<any>;
  GetLeadersBoard(req: Request, res: Response, next: NextFunction) : Promise<any>;
}
