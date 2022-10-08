import { NextFunction, Request, Response } from 'express';
import IUserServices from '../services/IUserServices';
import IUser from '../models/IUser';
import IUserController from './IUserController';

class UserController implements IUserController {
  constructor(
    private service : IUserServices) {}

  Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as IUser;
      const token = await this.service.ValidateLogin(user);
      return res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  };

  Validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const role = await this.service.ValidateToken(authorization);
      return res.status(200).send({ role });
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
