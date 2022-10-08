import { Router } from 'express';
import Factory from '../utils/Factory';
import validateLogin from '../middlewares/validateLogin';

const router = Router();

router.post('/login', validateLogin, Factory.GetUserController().Login);
router.get('/login/validate', Factory.GetUserController().Validate);
router.get('/teams/:id', Factory.GetTeamController().GetTeam);
router.get('/teams', Factory.GetTeamController().ListTeams);
router.get('/matches', Factory.GetMatchController().ListMatches);
router.post('/matches', Factory.GetMatchController().CreateMatch);
router.patch('/matches/:id/finish', Factory.GetMatchController().UpdateInProgress);
router.patch('/matches/:id', Factory.GetMatchController().UpdateScore);
router.get('/leaderboard/home', Factory.GetLeaderBoardController().GetHomeLeaders);
router.get('/leaderboard/away', Factory.GetLeaderBoardController().GetAwayLeaders);
router.get('/leaderboard', Factory.GetLeaderBoardController().GetLeadersBoard);
router.all('*', () => { throw new Error('Invalid request'); });

export default router;
