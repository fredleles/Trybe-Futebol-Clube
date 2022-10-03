import { ErrorRequestHandler, Response, Request, NextFunction } from 'express';
import CustomError from '../models/CustomError';

const HandleErrors: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof CustomError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send('Invalid');
  }
};

export default HandleErrors;