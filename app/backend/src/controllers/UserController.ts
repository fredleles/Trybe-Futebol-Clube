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

  async Validate(req: Request, res: Response) {
    this.service = new UserServices();
    const { authorization } = req.headers;
    const role = await this.service.ValidateToken(authorization);
    res.status(200).send({ role });
  }
}
