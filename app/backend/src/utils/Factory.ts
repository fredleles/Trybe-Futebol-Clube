import UserController from '../controllers/UserController';
import IUserController from '../controllers/IUserController';
import ITeamController from '../controllers/ITeamController';
import TeamsController from '../controllers/TeamsController';
import IMatchController from '../controllers/IMatchController';
import MatchController from '../controllers/MatchController';
import ILeaderBoardController from '../controllers/ILeaderBoardController';
import LeaderBoardController from '../controllers/LeaderBoardController';
import IUserServices from '../services/IUserServices';
import UserServices from '../services/UserServices';
import ITeamServices from '../services/ITeamServices';
import TeamsServices from '../services/TeamsServices';
import IMatchServices from '../services/IMatchServices';
import MatchServices from '../services/MatchServices';
import ILeaderBoardServices from '../services/ILeaderBoardServices';
import LeaderBoardServices from '../services/LeaderBoardServices';
import ITeamScore from '../models/ITeamScore';
import TeamScore from '../models/TeamScore';
import ITeam from '../models/ITeam';
import { IMatch } from '../models/IMatch';

export default class Factory {
  static GetUserController() : IUserController {
    return new UserController(this.GetUserServices());
  };

  static GetTeamController() : ITeamController {
    return new TeamsController(this.GetTeamServices());
  };

  static GetMatchController() : IMatchController {
    return new MatchController(this.GetMatchServices());
  };

  static GetLeaderBoardController() : ILeaderBoardController {
    return new LeaderBoardController(this.GetLeaderBoardServices());
  };

  private static GetUserServices() : IUserServices {
    return new UserServices();
  };

  private static GetTeamServices() : ITeamServices {
    return new TeamsServices();
  };

  private static GetMatchServices() : IMatchServices {
    return new MatchServices(this.GetTeamServices());
  };

  private static GetLeaderBoardServices() : ILeaderBoardServices {
    return new LeaderBoardServices(this.GetMatchServices(), this.GetTeamServices());
  };

  static GetTeamScore(team : ITeam, matches : IMatch[]) : ITeamScore {
    return new TeamScore(team, matches)
  };
}
