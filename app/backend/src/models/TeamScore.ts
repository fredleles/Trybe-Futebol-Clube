import IBoard from './IBoard';
import { IMatch } from './IMatch';
import ITeam from './ITeam';

export default class TeamScore {
  private name: string;
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency: string;

  constructor(private team : ITeam, private matches : IMatch[]) {
    this.name = team.teamName;

    this.summarizeScore();

    this.totalPoints = 3 * this.totalVictories + this.totalDraws;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  private summarizeScore() {
    this.matches.forEach((match) => {
      this.totalGames += 1;
      if (match.homeTeam === this.team.id) {
        this.goalsFavor += match.homeTeamGoals;
        this.goalsOwn += match.awayTeamGoals;

        if (match.homeTeamGoals > match.awayTeamGoals) this.totalVictories += 1;
        else if (match.homeTeamGoals < match.awayTeamGoals) this.totalLosses += 1;
        else this.totalDraws += 1;
      } else {
        this.goalsFavor += match.awayTeamGoals;
        this.goalsOwn += match.homeTeamGoals;

        if (match.homeTeamGoals < match.awayTeamGoals) this.totalVictories += 1;
        else if (match.homeTeamGoals > match.awayTeamGoals) this.totalLosses += 1;
        else this.totalDraws += 1;
      }
    });
  }

  getScore() : IBoard {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }
}
