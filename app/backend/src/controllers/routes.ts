import { Router } from 'express';
import UserController from './UserController';

const router = Router();

router.post('/login', new UserController().Login);
router.all('*', () => { throw new Error(); });

export default router;
