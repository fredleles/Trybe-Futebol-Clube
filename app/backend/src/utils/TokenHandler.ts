import * as jwt from 'jsonwebtoken';

export default class TokenHandler {
  public static Sign(payload: object) : string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  }

  public static Verify(token: string) : jwt.JwtPayload | string {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
