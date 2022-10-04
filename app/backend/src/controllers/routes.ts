import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import UserController from './UserController';

const router = Router();

router.post('/login', validateLogin, new UserController().Login);
router.all('*', () => { throw new Error(); });

export default router;
