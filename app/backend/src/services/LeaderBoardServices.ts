import IBoard from '../models/IBoard';
import ITeam from '../models/ITeam';
import MatchServices from './MatchServices';
import TeamsServices from './TeamsServices';
import TeamScore from '../models/TeamScore';

class LeaderBoardServices {
  private getScore = async (team: ITeam, matchType: object) : Promise<IBoard> => {
    const matches = await MatchServices.List({ inProgress: false, ...matchType });

    return new TeamScore(team, matches).getScore();
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

  List = async (type: string) => {
    const teamsList = await TeamsServices.List();
    const scorePromises = teamsList.map((team) => {
      if (type === 'home') return this.getScore(team, { homeTeam: team.id });
      return this.getScore(team, { awayTeam: team.id }); // away
    });

    const teamsScore = await Promise.all(scorePromises) as IBoard[];
    return this.sortList(teamsScore);
  };
}
export default new LeaderBoardServices();
