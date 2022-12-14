import User from '../../database/models/User';

const validUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
} as User;

const loggedUser = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
};

export default { validUser, loggedUser };
