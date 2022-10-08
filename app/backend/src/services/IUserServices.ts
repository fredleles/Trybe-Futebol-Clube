import IUser from '../models/IUser';

export default interface IUserServices {
  ValidateLogin(user: IUser) : Promise<string>;
  ValidateToken(token: string | undefined) : Promise<string | undefined>;
}
