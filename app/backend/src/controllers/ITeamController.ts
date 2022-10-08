import { NextFunction, Request, Response } from 'express';

export default interface ITeamController {
  ListTeams(req: Request, res: Response, next: NextFunction) : Promise<any>;
  GetTeam(req: Request, res: Response, next: NextFunction) : Promise<any>;
}
