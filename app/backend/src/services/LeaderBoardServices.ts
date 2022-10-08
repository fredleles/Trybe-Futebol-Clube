import Factory from '../utils/Factory';
import IBoard from '../models/IBoard';
import ITeam from '../models/ITeam';
import ILeaderBoardServices from './ILeaderBoardServices';
import IMatchServices from './IMatchServices';
import ITeamServices from './ITeamServices';

class LeaderBoardServices implements ILeaderBoardServices {
  constructor(
    private matchServices : IMatchServices,
    private teamServices : ITeamServices,
  ) {};

  private getScore = async (team: ITeam, matchType: object) : Promise<IBoard> => {
    const matches = await this.matchServices.List({ inProgress: false, ...matchType });

    return Factory.GetTeamScore(team, matches).getScore();
  };

  private sortList = (list: IBoard[]) => (
    list.sort((a, b) => {
      if (b.totalPoints - a.totalPoints !== 0) return b.totalPoints - a.totalPoints;
      if (b.totalVictories - a.totalVictories !== 0) return b.totalVictories - a.totalVictories;
      if (b.goalsBalance - a.goalsBalance !== 0) return b.goalsBalance - a.goalsBalance;
      if (b.goalsFavor - a.goalsFavor !== 0) return b.goalsFavor - a.goalsFavor;
      return a.goalsOwn - b.goalsOwn;
    })
  );

  private joinList = async (team : ITeam) : Promise<IBoard> => {
    const scores = await Promise.all([
      this.getScore(team, { homeTeam: team.id }),
      this.getScore(team, { awayTeam: team.id }),
    ]);

    const response : IBoard = {
      name: team.teamName,
      totalPoints: scores[0].totalPoints + scores[1].totalPoints,
      totalGames: scores[0].totalGames + scores[1].totalGames,
      totalVictories: scores[0].totalVictories + scores[1].totalVictories,
      totalDraws: scores[0].totalDraws + scores[1].totalDraws,
      totalLosses: scores[0].totalLosses + scores[1].totalLosses,
      goalsFavor: scores[0].goalsFavor + scores[1].goalsFavor,
      goalsOwn: scores[0].goalsOwn + scores[1].goalsOwn,
      goalsBalance: scores[0].goalsBalance + scores[1].goalsBalance,
      efficiency: (((scores[0].totalPoints + scores[1].totalPoints)
        / ((scores[0].totalGames + scores[1].totalGames) * 3)) * 100).toFixed(2),
    };
    return response;
  };

  List = async (type: string) => {
    const teamsList = await this.teamServices.List() as ITeam[];
    const scorePromises = teamsList.map((team) => {
      if (type === 'home') return this.getScore(team, { homeTeam: team.id });
      if (type === 'away') return this.getScore(team, { awayTeam: team.id });
      return this.joinList(team);
    });

    const teamsScore = await Promise.all(scorePromises) as IBoard[];
    return this.sortList(teamsScore);
  };
}
export default LeaderBoardServices;
