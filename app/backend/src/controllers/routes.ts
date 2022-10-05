import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import LeaderBoardController from './LeaderBoardController';
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
router.patch('/matches/:id/finish', MatchController.UpdateInProgress);
router.patch('/matches/:id', MatchController.UpdateScore);
router.get('/leaderboard/home', LeaderBoardController.GetHomeLeaders);
router.get('/leaderboard/away', LeaderBoardController.GetAwayLeaders);
router.all('*', () => { throw new Error('Invalid request'); });

export default router;
