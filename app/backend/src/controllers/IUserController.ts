import { NextFunction, Request, Response } from 'express';

export default interface IUserController {
  Login(req: Request, res: Response, next: NextFunction) : Promise<any>;
  Validate(req: Request, res: Response, next: NextFunction) : Promise<any>;
}
