import CustomError from '../models/CustomError';
import User from '../database/models/User';
import IUser from '../models/IUser';
import CryptHandler from '../utils/CryptHandler';
import TokenHandler from '../utils/TokenHandler';


export default class UserServices {
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
    
    const tokenData = {
      id: userDB.id,
      username: userDB.username,
      email: userDB.email,
    };
    return TokenHandler.Sign(tokenData);
  }
}