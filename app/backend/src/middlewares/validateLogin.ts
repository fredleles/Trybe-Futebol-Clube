import { Request, Response, NextFunction } from 'express';
import CustomError from '../models/CustomError';

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) throw new CustomError(400, 'All fields must be filled');
  next();
};

export default validateLogin;
