import * as jwt from 'jsonwebtoken';

export default class TokenHandler {
  public static Sign(payload: object) : string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  }
}
