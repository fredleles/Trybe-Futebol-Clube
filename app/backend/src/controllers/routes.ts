import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import MatchController from './MatchController';
import TeamsController from './TeamsController';
import UserController from './UserController';

const router = Router();

router.post('/login', validateLogin, UserController.Login);
router.get('/login/validate', UserController.Validate);
router.get('/teams/:id', TeamsController.GetTeam);
router.get('/teams', TeamsController.ListTeams);
router.get('/matches', MatchController.ListMatches);
router.post('/matches', MatchController.CreateMatch);
router.all('*', () => { throw new Error(); });

export default router;
