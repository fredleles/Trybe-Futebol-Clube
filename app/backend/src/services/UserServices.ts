import CustomError from '../models/CustomError';
import User from '../database/models/User';
import IUser from '../models/IUser';
import CryptHandler from '../utils/CryptHandler';
import TokenHandler from '../utils/TokenHandler';
import ILoggedUser from '../models/ILoggedUser';

export default class UserServices {
  private tokenHandler = TokenHandler;

  async ValidateLogin(user: IUser) {
    const { email, password } = user;

    const userDB = await User.findOne({ where: { email } });
    if (!userDB) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const isPasswordValid = CryptHandler.Compare(password, userDB.password);
    if (!isPasswordValid) {
      throw new CustomError(401, 'Incorrect email or password');
    }

    const payload = {
      id: userDB.id,
      email: userDB.email,
      username: userDB.username,
      role: userDB.role,
    };

    return this.tokenHandler.Sign(payload);
  }

  async ValidateToken(token: string | undefined) {
    if (!token) throw new CustomError(401, 'Token is mandatory');
    const { id } = this.tokenHandler.Verify(token) as ILoggedUser;
    const userDB = await User.findOne({ where: { id } });
    return userDB?.role;
  }
}
