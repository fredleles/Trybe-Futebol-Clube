import { Request, Response } from 'express';
import IUser from '../models/IUser';
import UserServices from '../services/UserServices';

export default class UserController {
  async Login(req: Request, res: Response) {
    const user = req.body as IUser;
    const token = await new UserServices().ValidateLogin(user);
    res.status(200).send({ token });
  }
}