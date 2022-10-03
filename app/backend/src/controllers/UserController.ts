import { Request, Response } from 'express';
import IUser from '../models/IUser';
import UserServices from '../services/UserServices';

export default class UserController {
  private service: UserServices;

  async Login(req: Request, res: Response) {
    this.service = new UserServices();
    const user = req.body as IUser;
    const token = await this.service.ValidateLogin(user);
    res.status(200).send({ token });
  }
}
