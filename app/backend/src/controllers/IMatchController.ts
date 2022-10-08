import { NextFunction, Request, Response } from 'express';

export default interface IMatchController {
  ListMatches(req: Request, res: Response, next: NextFunction) : Promise<any>;
  CreateMatch(req: Request, res: Response, next: NextFunction) : Promise<any>;
  UpdateInProgress(req: Request, res: Response, next: NextFunction) : Promise<any>;
  UpdateScore(req: Request, res: Response, next: NextFunction) : Promise<any>;
}
